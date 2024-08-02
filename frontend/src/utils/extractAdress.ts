import { Address } from "@/types";

function extractAddress(place: google.maps.places.PlaceResult): Address {
  const addressComponents: Address = {
    address: "",
    city: "",
    postalcode: "",
    country: "",
  };

  if (place.address_components) {
    for (const component of place.address_components) {
      const types = component.types;
      if (types.includes("street_number")) {
        addressComponents.address = component.long_name + " " + addressComponents.address;
      }
      if (types.includes("route")) {
        addressComponents.address += component.long_name;
      }
      if (types.includes("locality")) {
        addressComponents.city = component.long_name;
      }
      if (types.includes("postal_code")) {
        addressComponents.postalcode = component.long_name
          .split("")
          .filter((letter) => !isNaN(Number(letter)))
          .join("");
      }
      if (types.includes("country")) {
        addressComponents.country = component.long_name;
      }
    }
  }

  return addressComponents;
}

export default extractAddress;
