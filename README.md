# Readme file for aws-icons-3d

## Overview

This repository contains some web scraping python code using Selenium and a website for displaying the scraped data using sveltkit and threejs.

The python notebook scraped most of the AWS services from http://aws-icons.com but some manual modifications had to be made - for example:
market_dark -> market
market_light -> market
as the search link was meaningles and did not find anything so we changed it.

Once the data was in a nice data format...
```
[
    {object 1},
    {object 2}
]
```

 a previous implementation from https://periodic-table-3d-zeta.vercel.app/ was adapted to display the 311 services. Some cool things about this project (IMHO) were inheriting the color of the div backgrounds and the show info panel from the color of the svg - had to manually extract the color for each of the svgs using bash commands. Check out the shell scripts.

 Used https://www.npmjs.com/package/flexsearch for searching locally (ie, no network calls)

 Used https://codepen.io/JosephusPaye/pen/vbaxBa
for linear gradient conversion, and then copied and pasted the CSS linear gradient code. Had to rotate the color wheel by 90 degrees, ie, -45 degrees -> 45 degrees 8)

This code is a memory hog, but it works. Need to figure out how to not have an event listener on each of the 311 divs and just have a central one and dispatch accordingly. Could also eliminate some global variables that hang around in memory unnecessarily.

Enjoy!


