document.onload = main();


function main(){
   //Gets all cosDNA Product tabs in the current window
   const baseURL = {"url": "http://www.cosdna.com/eng/cosmetic_*"}
   chrome.tabs.query(baseURL, function(tabs){
       if (tabs[0]){
            var products= [];
            var checkboxHTML = "";
            for (i=0; i < tabs.length; i++){
                // Isolates the product title by removing " ingredients | CosDNA"
                var ingredientsIndex = tabs[i].title.indexOf(" ingredients");
                products.push(tabs[i].title.slice(0, ingredientsIndex));
            }
            for (i=0; i < products.length; i++){
                // Adds each product to the checkbox form

                var productTitleShortened = ""; // First limit the length of the title
                if (products[i].length > 20){
                    productTitleShortened = products[i].slice(0, 20) + "...";
                } else{
                    productTitleShortened = products[i];
                }
                checkboxHTML += `
                                <div class="form-check checkboxDiv">
                                    <input class="form-check-input" type="checkbox" value="${products[i]}" id="product${i}">
                                    <label class="form-check-label" for="product${i}">${productTitleShortened}<hr></label>
                                </div>
                                `
            }

            document.getElementById("tabsResponse").innerHTML =
                `
                <h6 id="popupH6">We've detected these products:</h6>
                <form id="popupForm">
                    <div class="form-group" id="productChecklist"></div>
                </form>

                <button type="button" class="btn btn-primary" id="popupCompareButton">Compare!</button>
                `;
            document.getElementById("productChecklist").innerHTML = checkboxHTML; // Populate form with products

            document.getElementById("popupCompareButton").onclick = function(){chrome.tabs.create({"url":"../comparison/comparison.html"}, function(tab){
                // Create the comparison page
            })};
       }else{
        document.getElementById("tabsResponse").innerHTML = `
                                                             <h6 id="popupH6">We did not detect any products.</h6>
                                                             <p>Visit <a href="http://www.cosdna.com/" target="_blank">cosdna.com</a> to find some.</p>
                                                            `;
       }
   });
};
