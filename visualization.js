//Data in GWh
var data = {
    wasserkraft: {
        "2000": 37851,
            "2001": 42261,
            "2002": 36513,
            "2003": 36445,
            "2004": 35117,
            "2005": 32759,
            "2006": 32557,
            "2007": 36373,
            "2008": 37559,
            "2009": 37136,
            "2010": 37450,
            "2011": 33795,
    },
    kernkraft: {
        "2000": 24949,
            "2001": 25293,
            "2002": 25692,
            "2003": 25931,
            "2004": 25432,
            "2005": 22020,
            "2006": 26244,
            "2007": 26344,
            "2008": 26132,
            "2009": 26119,
            "2010": 25205,
            "2011": 25560
    },
    fossil: {
        "2000": 2372,
            "2001": 2433,
            "2002": 2612,
            "2003": 2690,
            "2004": 2778,
            "2005": 2934,
            "2006": 3105,
            "2007": 2896,
            "2008": 2914,
            "2009": 2820,
            "2010": 3131,
            "2011": 2885
    },
    regenerativ: {
        "2000": 176,
            "2001": 187,
            "2002": 194,
            "2003": 200,
            "2004": 196,
            "2005": 205,
            "2006": 235,
            "2007": 303,
            "2008": 362,
            "2009": 419,
            "2010": 466,
            "2011": 641
    },
    gesamt: {
        "2000": 65348,
            "2001": 70174,
            "2002": 65011,
            "2003": 65266,
            "2004": 63523,
            "2005": 57918,
            "2006": 62141,
            "2007": 65916,
            "2008": 66967,
            "2009": 66494,
            "2010": 66252,
            "2011": 62881
    }
};

var maxGesamt = 70174; //The overall maximum energy production

window.onload = function () {
    var paper = new Raphael(document.getElementById('canvas_container'), 500, 400);

    var jahr = 2011;
    
    paper.customAttributes.arc = function (xloc, yloc, value, total, R) {
    
    
        var alpha = 360 / total * value,
            a = (90 - alpha) * Math.PI / 180,
            x = xloc + R * Math.cos(a),
            y = yloc - R * Math.sin(a),
            path;
        if (total == value) {
            path = [
                ["M", xloc, yloc - R],
                ["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
            ];
        } else {
            path = [
                ["M", xloc, yloc - R],
                ["A", R, R, 0, +(alpha > 180), 1, x, y]
            ];
        }
        return {
            path: path
        };
    };
    kernkraft = paper.path().attr({
        'arc': [150, 220, 100, 200, 200],
            'stroke': '#FFFF0F',
            'stroke-width': 10
    }).rotate(-90);
    
    wasserkraft = paper.path().attr({
        'arc': [160, 230, 100, 200, 180],
            'stroke': '#CCFFFF',
            'stroke-width': 10
    }).rotate(-90);
    
    fossil = paper.path().attr({
        'arc': [170, 240, 100, 200, 160],
            'stroke': '#CC0000',
            'stroke-width': 10
    }).rotate(-90);
    
    regenerativ = paper.path().attr({
        'arc': [180, 250, 100, 200, 140],
            'stroke': '#00CC00',
            'stroke-width': 10
    }).rotate(-90);
    
    gesamt = paper.rect(45, 340, 410, 20).attr({
        'stroke': '#FF8800',
            'fill': '#FFCC00'
    });
    
    paper.text(80, 40, "Click on a year").attr({
        'stroke': '#fff'
    });
    
    var tGesamt = paper.text(105, 350, "Gesamt").attr({
        'stroke': '#883300',
            'font-size': '12px'
    });
    
    paper.text(90, 380, "Quelle: STAT-TAB").attr({
        'stroke': '#fff'
    });
    
    paper.text(70, 330, "Kernkraft").attr({
        'stroke': '#FFFF0F',
            'font-size': "12px"
    });
    paper.text(150, 330, "Wasserkraft").attr({
        'stroke': '#CCFFFF',
            'font-size': "12px"
    });
    paper.text(230, 330, "Fossile").attr({
        'stroke': "#FF000F",
            'font-size': "14px"
    });
    paper.text(320, 330, "Regenerative").attr({
        'stroke': "#00CC0F",
            'font-size': "14px"
    });
    
    
    window.setJahr = function (nJahr) {
        jahr = nJahr + "";
        
        kernkraft.animate({
            arc: [
            150, 220,
            100 * (data.kernkraft[jahr] / data.gesamt[jahr]), 200,
            200]
        }, 1000, 'bounce');
    
        wasserkraft.animate({
            arc: [
            160, 230,
            100 * (data.wasserkraft[jahr] / data.gesamt[jahr]), 200,
            180]
        }, 1000, 'bounce');
    
        fossil.animate({
            arc: [
            170, 240,
            100 * (data.fossil[jahr] / data.gesamt[jahr]), 200,
            160]
        }, 1000, 'bounce');
    
        regenerativ.animate({
            arc: [
            180, 250,
            100 * (data.regenerativ[jahr] / data.gesamt[jahr]), 200,
            140]
        }, 1000, 'bounce');
    
        gesamt.animate({
            'width': 410 * (data.gesamt[jahr] / maxGesamt)
        }, 1000, 'bounce');
    
        tGesamt.attr("text", "Gesamt: " + data.gesamt[jahr] + " GWh");
    }
    
    setJahr(jahr);
};