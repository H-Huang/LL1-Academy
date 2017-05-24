
function create_chart(chart_stats){ 
    chart_json = chart_stats;
    var gD = [
                ['data1', chart_json.skip],
                ['data2', chart_json.complete],
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
            type : 'donut'
        },
        donut: {
            title: "Grammars Learned"
        }
    });

    var qD = [
                ['data1', chart_json.wrong],
                ['data2', chart_json.correct],
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
        },
        donut: {
            title: "Questions Answered"
        }
    });
}

