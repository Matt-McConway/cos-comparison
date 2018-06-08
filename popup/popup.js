document.onload = main();

function main(){
   //Gets all cosDNA Product tabs in the current window
   chrome.tabs.query({"url":"http://www.cosdna.com/eng/cosmetic_*"}, function(tabs){
       if (tabs[0]){
            var products= [];
            var checkboxes = "";
            for (i=0; i < tabs.length; i++){
                var ingredientsLoc = tabs[i].title.indexOf(" ingredients");
                products.push(tabs[i].title.slice(0, ingredientsLoc));
            }
            for (i=0; i < products.length; i++){
                checkboxes += '<div class="form-check">' +
                              '<input class="form-check-input" type="checkbox" value="" id="defaultCheck' + i +'">' +
                              '<label class="form-check-label" for="defaultCheck'+ i + '">' +
                              products[i] + '<hr></label> </div>'
            }
            console.log(products);
            document.getElementById("tabsResponse").innerHTML =
                `<h6 id="popupH6">We've detected these products:</h6>
                <form id="popupForm">
                    <div class="form-group" id="productChecklist"></div>
                </form>

                <button type="button" class="btn btn-primary" id="popupCompareButton">Compare!</button>`;
            document.getElementById("productChecklist").innerHTML = checkboxes;
            document.getElementById("popupCompareButton").onclick = function(){chrome.tabs.create({"url":"../comparison/comparison.html"}, function(tab){
            })};
       }else{
        document.getElementById("tabsResponse").innerHTML = `<h6 id="popupH6">We did not detect any products.</h6> 
                                                             <p>Visit <a href="http://www.cosdna.com/" target="_blank">cosdna.com</a> to find some.</p>`;
       }
   });
};