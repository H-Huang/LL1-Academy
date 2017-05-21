
$(document).ready(function() {
  // $('#chart').append(create_chart());
  create_chart()
})

var chart = c3.generate({
    data: {
        columns: [
            ['Incorrect Answers', 30],
            ['Correct Answers', 30],
            ['Skipped Grammars', 120],
        ],
        type : 'donut',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    donut: {
        title: "Grammars Learned"
    }
});
