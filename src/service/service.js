export const getSchedule = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/resource");

    if (!response.ok) {
      throw new Error("Error en la solicitud a la API");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postCreateResources = async (payload) => {
  console.log(payload)
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    const ex = await fetch("http://localhost:3000/api/resource", requestOptions);
    console.log(ex)
    const response = await getSchedule();
    console.log("response",response)
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postReserveHour = async (payload) => {
  try {

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
    await fetch(`http://localhost:3000/api/resource/reserveHour`, requestOptions);

    const response = await getSchedule();

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteReserveHour = async (id) => {
  try {

    const requestOptions = {  
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    await fetch(`http://localhost:3000/api/resource/reserveHour/${id}`, requestOptions);

    const response = await getSchedule();

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const putResource = async (payload) => {
    try {

      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      };
      await fetch(`http://localhost:3000/api/resource/${payload.id}`, requestOptions);
  
      const response = await getSchedule();
  
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export const putReserveHour = async (payload) => {
    try {

      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      };
      await fetch(`http://localhost:3000/api/resource/reserveHour/${payload.id}`, requestOptions);
  
      const response = await getSchedule();
  
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export const deleteResource = async (id) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      await fetch(`http://localhost:3000/api/resource/${id}`, requestOptions);
  
      const response = await getSchedule();
  
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
