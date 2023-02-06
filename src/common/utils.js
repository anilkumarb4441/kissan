export default class Utils  {
    static refreshPage(hashItem){
        if(hashItem == "/"){
            window.location.href = "/";
        }
        else {
            window.location.href = "/" + hashItem;
        }
        
    }
    static loadScript(src) {

      return new Promise((resolve) => {

          const script = document.createElement("script");

          script.src = src;

          script.onload = () => {

              resolve(true);

          };

          script.onerror = () => {

              resolve(false);

          };

          document.body.appendChild(script);

      });

  }
    static getPageForCategory(categoryId, type) {
        if (categoryId >= 20 && categoryId <= 22) {
          return "Balers";
        }
        if (categoryId >= 59 && categoryId <= 61) {
          return "Balers_trader";
        } else if (categoryId >= 4 && categoryId <= 14) {
          return "harvester";
        } else if (categoryId >= 43 && categoryId <= 53) {
          return "harvester_traders";
        } else if (categoryId >= 16 && categoryId <= 18) {
          return "reaper";
        } else if (categoryId >= 55 && categoryId <= 57) {
          return "reaper_trader";
        } else if (categoryId >= 24 && categoryId <= 39) {
          return "FI";
        } else if (categoryId >= 63 && categoryId <= 78) {
          return "FI_traders";
        } else if (categoryId == 2) {
          return "tractor";
        } else if (categoryId == 41) {
          return "tractor_trader";
        } else if (
          (categoryId >= 81 && categoryId <= 85) ||
          (categoryId >= 87 && categoryId <= 90) ||
          (categoryId >= 92 && categoryId <= 96)
        ) {
          return "tyre";
        } else if (
          (categoryId >= 115 && categoryId <= 117) ||
          (categoryId >= 119 && categoryId <= 121) ||
          (categoryId >= 123 && categoryId <= 124)
        ) {
          return "property";
        } else if (categoryId < 40) {
          return categoryId;
        } else if (categoryId > 182 && categoryId < 188) {
          return "horse_traders";
        } else if (categoryId >= 107 && categoryId <= 112) {
          if (type == "cropFruit") {
            return "crop";
          }
          return "crop_reg";
        } else if (categoryId == 307 || categoryId == 308) {
          if (type == "cropFruit") {
            return "fruits_veg";
          }
          return "fruits_veg_reg";
        } else if (categoryId == 101) {
          return "horse";
        } else if (categoryId == 105) {
          return "dog";
        } else if (categoryId == 98) {
          return "cow";
        } else if (categoryId == 99) {
          return "ox";
        } else if (
          (categoryId >= 128 && categoryId <= 130) ||
          (categoryId >= 310 && categoryId <= 312) ||
          (categoryId >= 313 && categoryId <= 315)
        ) {
          return "pumpmotor";
        } else if (
          (categoryId > 140 && categoryId < 150) ||
          (categoryId >= 151 && categoryId <= 160) ||
          (categoryId >= 162 && categoryId <= 165)
        ) {
          return "livestock_feed";
        } else if (categoryId > 170 && categoryId < 175) {
          return "biomass_trader";
        } else if (categoryId >= 176 && categoryId <= 181) {
          return "silage";
        } else if (categoryId >= 189 && categoryId <= 205) {
          return "MachineryService";
        } else if (categoryId == 100) {
          return "buffalo";
        } else if (categoryId == 167 || categoryId == 301 || categoryId == 302) {
          return "PFS";
        } else if (categoryId == 168) {
          return "milk_diary";
        } else if (categoryId == 169) {
          return "milk_plant";
        } else if (categoryId == 103) {
          return "goat";
        } else if (categoryId == 104) {
          return "sheep";
        } else if (categoryId == 102) {
          return "camel";
        } else if (categoryId == 227) {
          return "Veterinary";
        } else {
          return "general";
        }
      }
}

