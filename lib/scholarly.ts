import pRetry from 'p-retry';
import cheerio from 'cheerio';
import { AnySoaRecord } from 'dns';

const SCHOLAR_BASE_URL = 'https://scholar.google.com';

class ScholarlyError extends Error {
    constructor(msg: string) {
      super(msg);
      this.name = 'ScholarlyError';
    }
  }
  
  class CaptchaError extends ScholarlyError {
    constructor(msg: string) {
      super(msg);
      this.name = 'CaptchaError';
    }
  }
  
  class ProxyError extends ScholarlyError {
    constructor(msg: string) {
      super(msg);
      this.name = 'ProxyError';
    }
  }
  
  const isCaptchaError = (err: any) => err instanceof CaptchaError;
  
  const isHTTPError = (err: any, { statusCode }: { statusCode: number }) => {
    return err.response.statusCode === statusCode;
  };
  
  const selectors = {
    captcha: {
      message: '[id^="gs_captcha"] h1'
    },
    pubSearch: {
      container: '.gs_ri',
      title: '.gs_rt a',
      authors: '.gs_a a'
    },
    pub: {
      wrapper: '#gsc_oci_title_wrapper',
      container: '#gsc_oci_table',
      title: '#gsc_oci_title a',
      link: '#gsc_oci_title a',
      pdf: '#gsc_oci_title_gg a',
      authors: '.gs_scl:first-child div:nth-of-type(2)',
      date: '.gs_scl:nth-of-type(2) div:nth-of-type(2)',
      journal: '.gs_scl:nth-of-type(3) div:nth-of-type(2)',
      volume: '.gs_scl:nth-of-type(4) div:nth-of-type(2) a:first-child',
      pages: '.gs_scl:nth-of-type(5) .gsc_vcd_value',
      publisher: '.gs_scl:nth-of-type(6) .gsc_vcd_value',
      description: '.gs_scl:nth-of-type(7) .gsc_vcd_value',
      citations: '.gs_scl:nth-of-type(8) .gsc_vcd_value div:first-child a',
      citationslink: '.gs_scl:nth-of-type(8) .gsc_vcd_value div:first-child a'
    },
    authorProfile: {
      pubs: '#gsc_a_t tbody tr',
      button: 'button#gsc_bpf_more'
    },
    author: {
      container: '#gsc_prf',
      name: '#gsc_prf_in',
      affiliation: '#gsc_prf_i > div:nth-child(2)',
      domain: '#gsc_prf_ivh',
      homepage: '#gsc_prf_ivh a',
      interests: '#gsc_prf_int a',
      citations: '#gsc_rsb_st tr:first-child .gsc_rsb_std',
      citations5y: '#gsc_rsb_st tr:first-child .gsc_rsb_std:nth-of-type(3)',
      metrics: '#gsc_rsb_st tr:nth-of-type(2) .gsc_rsb_std',
      metrics5y: '#gsc_rsb_st tr:nth-of-type(2) .gsc_rsb_std:nth-of-type(3)',
      i10index: '#gsc_rsb_st tr:nth-of-type(3) .gsc_rsb_std',
      i10index5y: '#gsc_rsb_st tr:nth-of-type(3) .gsc_rsb_std:nth-of-type(3)'
    },
    publications: {
      title: '.gsc_a_t a',
      authors: '.gsc_a_t div:nth-of-type(1)',
      journal: '.gsc_a_t div:nth-of-type(2)',
      citedby: '.gsc_a_c a',
      year: '.gsc_a_y span'
    },
    search: {
      container: '#gsc_sa_ccl',
      link: '.gs_ai_name a'
    }
  };

  class Scholar {
    // Simplified initialization without proxy/API key
    retries: number = 0;

    init({ retries = 0 }: { retries?: number } = {}) {
        this.retries = retries;
        return this;
    }

    _verifyPage($html: any) {
      const $ = $html;
      const { captcha } = selectors;
  
      const captchaMessage = $(captcha.message).text();
      if (captchaMessage) {
        throw new CaptchaError(captchaMessage);
      }
  
      return $html;
    }
  
    // Direct request using fetch
    async request(url: string) {
      return pRetry(async () => {
        const response = await fetch(url);
  
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
  
        const body = await response.text();
        const $html = cheerio.load(body);
        this._verifyPage($html); // Verifying the page for captcha or other issues
  
        return { body: $html };
      }, {
        retries: this.retries,
        onFailedAttempt: (error: Error) => {
            if (!isCaptchaError(error)) {
                throw error;
            }
        }
      });
    }
  
    async getAuthorID(query: string) {
      const url = new URL('citations', SCHOLAR_BASE_URL);
      url.searchParams.set('view_op', 'search_authors');
      url.searchParams.set('mauthors', query);
      const resp = await this.request(url.toString());
      return this.parseAuthorSearch(resp.body);
    }
    
    async getAuthorProfile(id: string, limit = 100, sortby = 'citedby') {
      // Limit is 20 by default
      var cstart = 0;
      var pagesize = 100; // 100 is the maximum can get at a time
      var flag = false;
      // sortby = sortby !== "citedby" ? "&view_op=list_works&sortby=pubdate" : "";
      if (typeof limit === 'number' && limit < pagesize) {
          // if (limit && limit<pagesize) {
          console.log(1, 'limit');
          pagesize = limit;
          flag = true;
      }
      var publications = [];
      var data = {} as any;
      while (true) {
          const url = new URL('citations', SCHOLAR_BASE_URL);
          const resp = await this.request(url.toString());
          const $html = cheerio.load(resp as any);
          const pubs = $html(selectors.authorProfile.pubs);
          for (var i = 0; i < pubs.length; i++) {
            if (publications.length >= Number(limit)) {
              // if (publications.length >= limit) {
              console.log(2, 'limit');
              flag = true;
              break;
            }
            const pub = this.parseAuthorPub(pubs[i]);
            publications.push(pub);
          }
          if (pubs.find('button').is('[disabled=]') !== true && !flag) {
            cstart += pagesize;
          } else {
            break;
          }
      }
      // if (publications) {
      data.publications = publications;
      // }
  
      console.log(data);
      return data;
    }
  
    async searchPub(query: any) {
      const url = new URL('scholar', SCHOLAR_BASE_URL);
      url.searchParams.set('q', query);
      const resp = await this.request(url.toString());
      return this.parsePubSearch(resp.body);
    }
  
    async getPub(id: string) {
      // id = userid:pubid  e.g., ynWS968AAAAJ:vDijr-p_gm4C
      const url = new URL('citations', SCHOLAR_BASE_URL);
      url.searchParams.set('view_op', 'view_citation');
      url.searchParams.set('citation_for_view', id);
      const resp = await this.request(url.toString());
      const data = this.parsePub(resp.body) as any;
      data.id = id;
      return data;
    }
  
    async getPubAuthors(query: string) {
      const { authors } = await this.searchPub(query);
      return Promise.all(
        authors.map(async ({ id, url }: { id: string, url: string }) => {
          const profile = await this.getAuthorProfile(id);
          return { id, ...profile };
        })
      );
    }
  
    parseAuthorSearch($html: any) {
      const $ = $html;
      const { search } = selectors;
      const $profileContainer = $(search.container);
      const $profile = $($profileContainer.find('.gsc_1usr')[0]);
  
      const name = $profile.find(search.link).text();
      const link = $profile.find(search.link).attr('href');
      const url = new URL(
        $profile.find(search.link).attr('href'),
        SCHOLAR_BASE_URL
      );
      const id = url.searchParams.get('user');
  
      return { id, name, url: url.href, link };
    }
  
    parsePubSearch($html: AnySoaRecord) {
      const $ = $html;
      const { pubSearch } = selectors;
      const $publicationContainer = $(pubSearch.container).first();
  
      const $authors = $publicationContainer.find(pubSearch.authors);
      const authors = $authors
        .map((_, el) => {
          const $el = $(el);
          const name = $el.text();
          const url = new URL($el.attr('href'), SCHOLAR_BASE_URL);
          const id = url.searchParams.get('user');
          return { id, name, url: url.href };
        })
        .get();
  
      const title = $publicationContainer.find(pubSearch.title).text();
      const link = $publicationContainer.find(pubSearch.title).attr('href');
  
      return { title, authors, link };
    }
  
    parsePub($html) {
      const $ = $html;
      const { pub } = selectors;
      const $publicationContainer = $(pub.container);
  
      const title = $(pub.wrapper).find(pub.title).text();
      const link = $(pub.wrapper).find(pub.link).attr('href');
      const pdf = $(pub.wrapper).find(pub.pdf).attr('href');
      const authors = $publicationContainer.find(pub.authors).text();
      const date = $publicationContainer.find(pub.date).text();
      const journal = $publicationContainer.find(pub.journal).text();
      const volume = $publicationContainer.find(pub.volume).first().text();
      const pages = $publicationContainer.find(pub.pages).text();
      const publisher = $publicationContainer.find(pub.publisher).text();
      const description = $publicationContainer.find(pub.description).text();
      const citations = $publicationContainer
        .find(pub.citations)
        .text()
        .split(' ')
        .pop();
      const citationslink = $publicationContainer
        .find(pub.citationslink)
        .attr('href');
  
      return {
        title,
        link,
        authors,
        date,
        journal,
        volume,
        pages,
        publisher,
        description,
        citations,
        citationslink,
        pdf
      };
    }
  
    parseAuthorProfile($html) {
      const $ = $html;
      const { author } = selectors;
      const $profileContainer = $(author.container);
  
      const name = $profileContainer.find(author.name).text();
      const affiliation = $profileContainer.find(author.affiliation).text();
      const homepage = $profileContainer.find(author.homepage).attr('href');
  
      const $domain = $profileContainer.find(author.domain);
      const emailInfo = $domain[0].childNodes[0].data.trim();
      const domain = emailInfo
        .split(/\s+/g)
        .filter((token) => token !== '-')
        .pop();
  
      const $interests = $profileContainer.find(author.interests);
      const interests = $interests.map((_, el) => $(el).text()).get();
  
      const citations = $(author.citations).first().text();
      const citations5y = $(author.citations5y).text();
      const hindex = $(author.metrics).first().text();
      const hindex5y = $(author.metrics5y).text();
      const i10index = $(author.i10index).first().text();
      const i10index5y = $(author.i10index5y).text();
  
      return {
        name,
        affiliation,
        homepage,
        domain,
        citations,
        citations5y,
        hindex,
        hindex5y,
        i10index,
        i10index5y,
        interests
      };
    }
  
    parseAuthorPub($html) {
      const $ = cheerio.load($html);
      const { publications } = selectors;
  
      const title = $(publications.title).text();
      const link = $(publications.title).attr('href');
      const url = new URL(link, SCHOLAR_BASE_URL);
      const id = url.searchParams.get('citation_for_view');
      const authors = $(publications.authors).text();
      const journal = $(publications.journal)
        .first()
        .contents()
        .filter(() => {
          return this.type === 'text';
        })
        .text();
      const citedby = $(publications.citedby).text();
      const citedbylink = $(publications.citedby).attr('href');
      const year = $(publications.year).text();
      // authors and journal are trimmed with an ellipsis
  
      return { id, title, link, authors, journal, citedby, citedbylink, year };
    }
  }
  

module.exports = new Scholar();
module.exports.ScholarlyError = ScholarlyError;
module.exports.CaptchaError = CaptchaError;
module.exports.ProxyError = ProxyError;
