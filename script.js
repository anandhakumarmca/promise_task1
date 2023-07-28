const container = document.createElement("div");
container.setAttribute("class", "container");

const heading = document.createElement("h1");
heading.setAttribute("id","title");
heading.setAttribute("class","text-center");
heading.innerHTML = "Displaying Dams of Tamilnadu";
document.body.appendChild(heading);

const row = document.createElement("div");
row.setAttribute("class", "row");

document.body.append(container);
container.appendChild(heading);
container.appendChild(row);

const displayDamDetails = async ()=>{
    const response = await fetch("https://api.data.gov.in/resource/7b3ed3e9-841f-4444-ab3c-e760a08b53b3?api-key=579b464db66ec23bdd0000017985a71bffbf422571a53b710f09d003&format=json");
    const data = await response.json();
    console.log(data.records);
    return data; //returning json data of API
}

displayDamDetails().then(data=>{
    for(var i=0;i<data.records.length;i++){
       // console.log(data.records[i]);
       row.innerHTML+=`
       <div class="col-sm-6 col-md-4 col-lg-4 col-xl-4">
           <div class="card h-100" >
               <div class="card-header text-center bg-dark text-white">${data.records[i].name_of_dam}</div>
               <div class="card-body text-center" id="card-body">
                   <p class="card-text">Town: ${data.records[i].nearest_city_town}</p>
                   <p class="card-text">River: ${data.records[i].river} </p>
                   <p class="card-text">Taluk: ${data.records[i].taluk}</p>
                   <p class="card-text">Year of Complition: ${data.records[i].year_of_completion}</Code></p>
                </div>
           </div>
        </div>
       `;
       document.body.append(container);
   }
   return data;
});

