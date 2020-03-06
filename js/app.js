
/////////////////////////The Products of the Bus mall\\\\\\\\\\\\\\\\\\\\\

var names = [
    "bag.jpg",
    "banana.jpg",
    "bathroom.jpg",
    "boots.jpg",
    "breakfast.jpg",
    "bubblegum.jpg",
    "chair.jpg",
    "cthulhu.jpg",
    "dog-duck.jpg",
    "dragon.jpg",
    "pen.jpg",
    "pet-sweep.jpg",
    "scissors.jpg",
    "shark.jpg",
    "sweep.png",
    "tauntaun.jpg",
    "unicorn.jpg",
    "usb.gif",
    "water-can.jpg",
    "wine-glass.jpg"
];

var result = document.getElementById('summary');
//////////////the random function\\\\\\\\\\\\

function getRandomNumber(min, max) {
    randomNumber = Math.floor(Math.random() * (max - min) + min);
    return randomNumber;
}

/////////////(1) get the images and the container\\\\\\\\\\

var leftimage = document.getElementById('leftimg'),
    centerimage = document.getElementById('centerimg'),
    rightimage = document.getElementById('rightimg'),
    containerOfimages = document.getElementById('imgcontainer');



///////////////////////////(2) create constructor function for the buss mall\\\\\\\\\\\\\\\\\\\\\\\\\

function BusMall(name) {

    this.name = name,
        this.clicks = 0,
        this.views = 0,
        this.imagepath = `img/${this.name}`,
        BusMall.all.push(this)

}

BusMall.all = [];

////////////////(3) instantiate objects for all the bussmall one shot\\\\\\\\\\\\\\\\

for (var i = 0; i < names.length; i++) {
    new BusMall(names[i]);
}


//////////////(4) render 3 random images\\\\\\\\\\\\\\\\\

var leftBussImg, centerBussImg, rightBussImg;

var uniqueImg = [];

var totalClicks = 0;

function runder() {

    leftBussImg = BusMall.all[getRandomNumber(0, names.length - 1)];
    centerBussImg = BusMall.all[getRandomNumber(0, names.length - 1)];
    rightBussImg = BusMall.all[getRandomNumber(0, names.length - 1)];

    ////////////////get a unique pic in row and subsequence\\\\\\\\\\\\\\\\\

    if (totalClicks >= 1) {
        while (uniqueImg.includes(leftBussImg.name) || uniqueImg.includes(centerBussImg.name) || uniqueImg.includes(rightBussImg.name) || leftBussImg === centerBussImg || leftBussImg === rightBussImg || centerBussImg === rightBussImg) {

            leftBussImg = BusMall.all[getRandomNumber(0, names.length - 1)];
            centerBussImg = BusMall.all[getRandomNumber(0, names.length - 1)];
            rightBussImg = BusMall.all[getRandomNumber(0, names.length - 1)];


        }

    } else if (totalClicks === 0) {
        while (leftBussImg === centerBussImg || leftBussImg === rightBussImg || centerBussImg === rightBussImg) {

            leftBussImg = BusMall.all[getRandomNumber(0, names.length - 1)];
            centerBussImg = BusMall.all[getRandomNumber(0, names.length - 1)];
            rightBussImg = BusMall.all[getRandomNumber(0, names.length - 1)];
        }
    }


    uniqueImg[0] = leftBussImg.name;
    uniqueImg[1] = centerBussImg.name;
    uniqueImg[2] = rightBussImg.name;





    //left image//

    leftimage.setAttribute('src', leftBussImg.imagepath);
    leftimage.setAttribute('alt', leftBussImg.name);
    leftimage.setAttribute('title', leftBussImg.name);
    leftBussImg.views++;


    //center image//

    centerimage.setAttribute('src', centerBussImg.imagepath);
    centerimage.setAttribute('alt', centerBussImg.name);
    centerimage.setAttribute('title', centerBussImg.name);
    centerBussImg.views++;

    //right image//

    rightimage.setAttribute('src', rightBussImg.imagepath);
    rightimage.setAttribute('alt', rightBussImg.name);
    rightimage.setAttribute('title', rightBussImg.name);
    rightBussImg.views++;

}

runder();

///////////////(5) add the event listener to render new images\\\\\\\\\\\\\\\

containerOfimages.addEventListener('click', calculateViewsClicks);

var myClicks = []; 
var myViews = [];

function calculateViewsClicks(event) {

    if (totalClicks < 25) {

        if (event.target.id !== 'imgcontainer') {

            if (event.target.id === 'leftimg') {

                leftBussImg.clicks++

            } else if (event.target.id === 'centerimg') {

                centerBussImg.clicks++

            } else if (event.target.id === 'rightimg') {

                rightBussImg.clicks++
            }


            totalClicks++;
            runder();
            


        }
    }

    else {
        alert('you are out of attempts');
        containerOfimages.removeEventListener('click', calculateViewsClicks);
        runderResult();

        setBusMallUpdattes();


    }
}

//////////////////////(6)local storage functions\\\\\\\\\\\\\\\\\\\


function setBusMallUpdattes() {

    var setBusMall = JSON.stringify(BusMall.all);

    localStorage.setItem('theSetBusMallItem', setBusMall);

}

function getBusMallUpdattes() {

    var getBusMall = localStorage.getItem('theSetBusMallItem');

    if (getBusMall) {

        BusMall.all = JSON.parse(getBusMall);

        result.innerHTML = "";

        runderResult();

        runderChart();

    }

}


getBusMallUpdattes();


///////////////(7) here i am adding my list of products \\\\\\\\\\\\\\\



function runderResult() {
    
    for (var x = 0; x < BusMall.all.length; x++) {
        var li1 = document.createElement('li');
        result.appendChild(li1);
        li1.textContent = `${BusMall.all[x].name} has ${BusMall.all[x].clicks} clicks and ${BusMall.all[x].views} views`;
        myClicks[x] = BusMall.all[x].clicks;
        myViews[x] = BusMall.all[x].views;

    }
}




///////////////(8) here i am adding my chart \\\\\\\\\\\\\\\

function runderChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: names,
            datasets: [{
                label: '# of Votes',
                data: myClicks,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            },
            {
                label: '# of views',
                data: myViews,
                backgroundColor: [
                    'rgba(250, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            },]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}
