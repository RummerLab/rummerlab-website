fetch("https://ig.instant-tokens.com/users/1d55f8ff-2133-4175-9f7e-4e9b03aa6dea/instagram/17841403684248284/token?userSecret=frrx8xumpiwf82oj5vjvj")
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error fetching the Instagram token: ${response.status}`);
        }
        return response.json();
    })
    .then(json => {
        var instafeed = new Instafeed({
            accessToken: json.Token,
            target: 'instafeed',
            limit: 80,
            success: function (array) {
                function shuffle(a) {
                    var j, x, i;
                    for (i = a.length - 1; i > 0; i--) {
                        j = Math.floor(Math.random() * (i + 1));
                        x = a[i];
                        a[i] = a[j];
                        a[j] = x;
                    }
                    return a;
                }
                array.data = shuffle(array.data);
                array.data = array.data.slice(0, 50);
                console.log(array);
                return array;
            },
            template: '<a href="\{\{link\}\}" target="_blank"><img src="\{\{image\}\}" alt="\{\{location\}\}" loading="lazy" /></a>'
        });
        instafeed.run();
    })
    .catch(error => {
        console.error('Error fetching the Instagram token:', error);
    });