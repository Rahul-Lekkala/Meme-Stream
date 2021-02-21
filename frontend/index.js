// Taking the form inputs for posting a meme
const memeForm = document.getElementById('meme-form-id');
const meme_api = 'https://tranquil-journey-52283.herokuapp.com/memes';
//const meme_api = 'http://localhost:8081/memes';
memeForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      //Take form data into object
      var formData1 = new FormData(document.forms[0])
      var object = {};
      formData1.forEach(function(value, key){
      object[key] = value;
      });

      //Convert form object to JSON so that it can be posted
      console.log(JSON.stringify(object));
      try{
            const response = await fetch(meme_api, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(object)
            });

            const result = await response.json();
            //console.log(response);
            //console.log(result);
            if (response.status >= 200 && response.status < 300) {
                  alert("Meme added successfully with id "+result.id);
                  location.reload();
                  console.log("Success");
            }else{
                  alert("Failed to add meme because "+result.DupliacteRequest);
                  location.reload();
                  console.log("Fail");
            }
      }catch(err){
            console.log(err);
      }
});
            
// Fetching all the memes from the api
fetch(meme_api)
      .then(function (response) {
            return response.json();
      })
      .then(function (data) {
            appendData(data);
      })
      .catch(function (err) {
            console.log('error: ' + err);
      });

// Create a new div consisting of meme name,caption,url and edit button
function appendData(data) {
      var mainContainer = document.getElementById("memes");
      var lower_bound = 0;
      if(data.length > 100)
            lower_bound = data.length-100;
      for (var i = data.length-1; i >= lower_bound ; i--) 
      {

            var meme_div = document.createElement("div");
            meme_div.className = "meme";
            
            //Meme Creator
            var name = document.createElement("p");
            name.innerHTML = '<strong>' + data[i].name + '</strong>'; + data[i].caption;
            meme_div.appendChild(name);

            //Caption
            var caption = document.createElement("p");
            caption.innerHTML = data[i].caption;
            meme_div.appendChild(caption);
            var div = document.createElement("div");
            div.className = "meme-image";

            //Edit button
            var edit = document.createElement("img");
            edit.className = "edit";
            edit.src = "images/edit.svg";
            var att1 = document.createAttribute("data-toggle");
            att1.value = "modal";
            edit.setAttributeNode(att1);
            var att2 = document.createAttribute("data-target");
            att2.value = "#form";
            edit.setAttributeNode(att2);
            var att3 = document.createAttribute("value");
            att3.value = data[i]._id;
            edit.setAttributeNode(att3);
            meme_div.appendChild(edit);

            //Image URL
            var image = document.createElement("img");
            image.src = data[i].url;
            image.alt = data[i].caption;
            div.appendChild(image);
            meme_div.appendChild(div);
            mainContainer.appendChild(meme_div);

      }
}

//To be done in future to handle urls that are broke
//handleImageNotFound();

// function handleImageNotFound() {
//       console.log("Image Not Found");
//       var images = document.getElementsByClassName("meme-image");
//       images.forEach(image=>{
//             image.onerror ="onerror=null;src='https://freefrontend.com/assets/img/html-funny-404-pages/HTML-404-Crying-Baby-Page.png'";
//       });
//       //alert('That image was not found.');
// }

//Add an eventlistener to entire document and check if edit button is clicked
document.addEventListener('click', function(e) {
      e = e || window.event;
      var target = e.target;
      if(target.className === "edit")
      {

            //Get the id of the object clicked, to later use it to update the meme
            const id = target.getAttribute("value");
            const updateMemeForm = document.getElementById('update-meme');
            updateMemeForm.addEventListener('submit', async function (e) {
                  e.preventDefault();
                  var formData2 = new FormData(document.forms[1])
                  var object = {};
                  formData2.forEach(function(value, key){
                  object[key] = value;
                  });
                  //console.log(object);
                  console.log(JSON.stringify(object));
                  const url = meme_api+"/"+id;

                  //Using xmlhttpreq as fetch cannot be used for PATCH method
                  var req = new XMLHttpRequest();
                  req.open("PATCH", url);

                  req.setRequestHeader("Accept", "application/json");
                  req.setRequestHeader("Content-Type", "application/json");

                  req.onreadystatechange = function () {
                        if (req.readyState === 4) {
                              console.log(req.status);
                              console.log(req.responseText);

                              if (req.status >= 200 && req.status < 300) {
                                    alert("Meme Updated successfully");
                                    location.reload();
                                    console.log("Success");
                              }else{
                                    alert("Failed to update meme because "+req.responseText);
                                    location.reload();
                                    console.log("Fail");
                              }
                        }
                  };

                  var updatedData = JSON.stringify(object);
                  console.log(updatedData);
                  req.send(updatedData);
            });
      }
  }, false);