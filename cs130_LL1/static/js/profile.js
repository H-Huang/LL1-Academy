
$(document).ready(function() {
  // $('#chart').append(create_chart());
  create_chart()
})

var gD = [
            ['data1', 30],
            ['data2', 120],
        ];
  
gD[0][0] = "Skipped: " + gD[0][1];
gD[1][0] = "Completed: " + gD[1][1];

var grammarChart = c3.generate({
    bindto: '#grammar_chart',
    color: {
        pattern: ['#B3E9F3','#5AB2D1',]
    },
    data: {
        columns: gD,
        type : 'donut',
        // onclick: function (d, i) { console.log("onclick", d, i); },
        // onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        // onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    donut: {
        title: "Grammars Learned"
    }
});

var qD = [
            ['data1', 2],
            ['data2', 40],
        ];

qD[0][0] = "Wrong: " + qD[0][1];
qD[1][0] = "Correct: " + qD[1][1];


var questionChart = c3.generate({
    bindto: '#question_chart',
    color: {
        pattern: ['#F7C996', '#e86830']
    },
    data: {
        columns: qD,
        type : 'donut',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    donut: {
        title: "Questions Answered"
    }
});


