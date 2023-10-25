
import React, {useEffect, useState} from "react";
function Update({id, onClose, updateProject }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (e) => {
    setName(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlesDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

    const handleClose = () => {
      onClose();
    };
    useEffect(() => {
      // Fetch the user investor details based on the provided ID
      fetch(`https://pitch-crest.onrender.com/user_investor1/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data && data.id && data.name && data.category && data.description) {
            // Set the initial values of the form fields based on the fetched data
            setName(data.name);
            setCategory(data.category);
            setDescription(data.description);
            updateProject(data.id, data)
          } else {
            console.error('Invalid response data structure');
          }
        })
        
       
        .catch((error) => {
          console.error("Error fetching user investor details:", error);
        });
    }, [id, updateProject]);
  
    const handleUpdateSubmit = (e) => {
      e.preventDefault();
  
      // Prepare the updated data
      const updatedData = {
        name,
        category,
        description,
      };
   // Send a PATCH request to update the user investor
   fetch(`http://127.0.0.1:5556/user_investor/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("User investor updated successfully:", data);
      onClose();
    })
    .catch((error) => {
      console.error("Error updating user investor:", error);
    });
};


  
    
    return(
        <>
         <span className="close" onClick={handleClose}>
        &times;
      </span>
       
      <div className="min-h-screen flex justify-center items-center bg-no-repeat bg-center bg-cover">
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute bg-black opacity-80 inset-0"></div>
          <div className="w-2/3 p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white max-h-screen overflow-y-auto">
            <div className="text-center p-5 flex-auto justify-center">
              <div className="text-center p-5 flex-auto justify-center">
      
      <div class="">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
  Update User Information
</h2>

       
        <form onSubmit={handleUpdateSubmit}>
  <div class="mb-6">
    <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
    <input 
    type="text"
    id="name"
    value={name}
    onChange={handleTitleChange}
     class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required/>
  </div>
  <div class="mb-6">
    <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
    <input 
    type="text"
    id="category"
    value={category}
    onChange={handleCategoryChange} 
    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
  </div>

  <div class="mb-6">
<label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Summary</label>
<textarea 
id="summary"
rows="4"
value={description}
onChange={handlesDescriptionChange}
class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
</div>
 

        
        <div class="p-3  mt-2 text-center space-x-4 md:block">
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Project</button>

            <button
            onClick={handleClose}
            class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Cancel
            </button>
            {/* <button class="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">Delete</button> */}
        </div>
        </form>
      </div>
    </div>
    </div>
    </div>
    </div>
  </div>
        </>
    )
}
export default Update