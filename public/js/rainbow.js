/************************************************
 *            Rainbow pattern methods           *
 *                                              *
 *                    Lab9K                     *
 ************************************************/

const frequency = .001; // slow change
const range = 10000000; // loop iterate a lot
/**
 * @return {string}
 */
function RGB2Color(r,g,b)
{
    return 'rgb(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ')';
}

function rainbow_get(index) {
    index %= range;
    let red   = Math.sin(frequency * index) * 127 + 128;
    let green = Math.sin(frequency * index + (2 * Math.PI / 3)) * 127 + 128;
    let blue  = Math.sin(frequency * index + (4 * Math.PI / 3)) * 127 + 128;

    return RGB2Color(red,green,blue);
}
