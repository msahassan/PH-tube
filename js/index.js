const handleCategory = async () => {
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await res.json();

  //  Button create
  const buttonContainer = document.getElementById("button-container");
  const trimData = data.data;
  trimData.forEach((data) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <button onclick=handleLoadCategory('${data.category_id}') class="btn btn-outline">${data.category}</button>
        `;
    buttonContainer.appendChild(div);
  });
  console.log(data.data);
};
// show the Id section
const handleLoadCategory = async (categoryID) => {
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/videos/category/${categoryID}`
  );
  const data = await res.json();
  console.log = data.data;

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = " ";
  const cardItem = data.data;
  cardItem.forEach((card) => {
    let arr = [];
    const cardViewArray = Object.values(card?.others);
    // console.log(cardViewArray);

    const postedTime = card?.others?.posted_date;

    const div = document.createElement("div");
    div.innerHTML = `

    
    <div class="card w-[100] h-[92] bg-base-100 shadow-xl mt-6">
      <img class=" w-auto h-[300px] rounded-lg" src="${
        card?.thumbnail
      }" alt="" />
       <p class="absolute bottom-0 right-2 text-white">${
         postedTime ? secondsToHoursAndMinutes(postedTime) : ""
       }
        
      </p>
    </div>
  
    <section class="mt-5 flex gap-3 pl-4 items-center">
     <div><img class="rounded-full w-[40px] h-[40px]" src="${
       card?.authors[0]?.profile_picture
     }" alt=""></div>
     <div class="font-medium"> <h4>${card?.title}</h4></div>
    </section>
   <div class="name ml-16 font-medium">
   <p>${card?.authors[0]?.profile_name}</p>
    <p>${card?.others?.views} views</p>
   </div>

    
        `;

    cardContainer.appendChild(div);
  });

  // Time conversion

  function secondsToHoursAndMinutes(seconds) {
    const hours = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const minute = Math.floor(remainingSeconds / 60);

    return `${hours}hrs ${minute} min ago`;
  }

  // drawing (data);
  const handleDrawing = (categoryID) => {
    const drawingBtn = document.getElementById("drawing-btn");
    if (categoryID === "1005") {
      drawingBtn.classList.remove("hidden");
    } else {
      drawingBtn.classList.add("hidden");
    }
  };
  handleDrawing(categoryID);
};

handleCategory();
handleLoadCategory("1000");
