
window.addEventListener('load',()=>{
    let long;
    let lat ;
    let weatherIcon = document.querySelector(".weather-icon");
    let tempDescription  = document.querySelector(".temperature-description");
    let tempDegree = document.querySelector(".temperature-degree");
    let region = document.querySelector(".location-timezone");
    let degreeSection = document.querySelector(".degree-section");
    let degreeSpan = document.querySelector(".degree-section span");

    const apiKey = '553cf18b66bf0c2b18ec67ee45576326';
    let units = "metric";

    if(navigator.geolocation){
        console.log("location found");
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(long,lat);
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api =`${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;
            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    console.log(data);
                    const {name} = data;
                    const {temp} = data.main;
                    const{description,icon} = data.weather[0];
                    console.log(temp ,description,name,icon);
                    tempDegree.textContent = temp;
                    tempDescription.textContent = description;
                    region.textContent = name;
                    weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

                    let farenheit = (temp * 9/5) +32;
                    //change temperature to celcuis or farenheit
                    degreeSection.addEventListener('click',() =>{
                        if(degreeSpan.textContent === "C"){
                            degreeSpan.textContent ="F";
                            tempDegree.textContent = Math.floor(farenheit);

                            
                        }else{
                            degreeSpan.textContent ="C";
                            tempDegree.textContent = temp;
                            
                        }
                    });


                });
        });
    }else{
        console.log("Location not found");
        
    }

    

});