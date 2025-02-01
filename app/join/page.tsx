import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Join Our Lab | RummerLab",
  description: "Opportunities to join the RummerLab team - positions available for graduate students, postdocs, and undergraduate researchers.",
}

export default function JoinPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Join Our Lab</h1>
      
      <div className="space-y-12">
        {/* Introduction */}
        <section>
          <p className="text-lg text-gray-600 mb-6">
            We are always looking for passionate and motivated individuals to join our team. Our lab offers a collaborative 
            and supportive environment for researchers interested in studying physiological and evolutionary adaptations in fishes.
          </p>
        </section>

        {/* Apply Now Section */}
        <section className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Join Our Team!</h2>
          <p className="text-white text-lg mb-6">
            Are you interested in joining our lab? Fill this Google Form to apply:
          </p>
          <a
            href="#" // Replace with actual Google Form URL
            target="_blank"
            rel="noopener"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            APPLY NOW
          </a>
        </section>

        {/* Available Positions */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Available Positions</h2>
          
          <div className="space-y-8">
            {/* Graduate Students */}
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Graduate Students</h3>
              <p className="text-gray-600">
                We are accepting applications for PhD and MSc students interested in fish physiology, evolution, and climate change research. 
                Successful candidates will have the opportunity to develop their own research projects within the lab&apos;s broader research themes.
              </p>
            </div>

            {/* Postdoctoral Fellows */}
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Postdoctoral Fellows</h3>
              <p className="text-gray-600">
                We welcome inquiries from potential postdoctoral fellows. We encourage candidates to contact us with their research 
                interests and to explore funding opportunities through NSERC and other agencies.
              </p>
            </div>

            {/* Undergraduate Students */}
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Undergraduate Students</h3>
              <p className="text-gray-600">
                We offer research opportunities for undergraduate students through work-study positions, summer research projects, 
                and honors thesis projects. These positions are typically advertised at the beginning of each semester.
              </p>
            </div>
          </div>
        </section>

        {/* How to Apply */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Apply</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-600 mb-4">
              To apply for a position in our lab, please send the following materials to Dr. Rummer:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>CV/resume</li>
              <li>Academic transcripts (unofficial is fine)</li>
              <li>Brief statement of research interests and career goals</li>
              <li>Contact information for 2-3 references</li>
            </ul>
          </div>
        </section>

        {/* Lab Environment */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Lab Environment</h2>
          <p className="text-gray-600">
            We are committed to fostering an inclusive, supportive, and collaborative research environment. 
            Our team values diversity and welcomes applications from members of underrepresented groups in science. 
            We provide mentorship and professional development opportunities to help our team members achieve their career goals.
          </p>
        </section>

        {/* Contact */}
        <section>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Questions?</h2>
            <p className="text-gray-600">
              If you have any questions about joining our lab or would like to discuss potential opportunities, 
              please don&apos;t hesitate to <a href="/contact" className="text-blue-600 hover:text-blue-800 underline">contact us</a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
} 
