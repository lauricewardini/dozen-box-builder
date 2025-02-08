import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "./ui/Button";

const flavors = [
  { name: "Chocolate Ring", image: "/images/chocolatering.png", size: "round" },
  { name: "Cinnamon Crumb", image: "/images/crinnamoncrumb.png", size: "round" },
  { name: "Cream Filled", image: "/images/creamfilled.png", size: "round" },
  { name: "Glazed Ring", image: "/images/glazed.png", size: "round" },
  { name: "Maple Bar", image: "/images/maplebar.png", size: "long" },
  { name: "Pink Sprinkle", image: "/images/pinksprinkle.png", size: "round" },
  { name: "Plain Cake", image: "/images/plaincake.png", size: "long" },
  { name: "Twist", image: "/images/twist.png", size: "long" }, 
  { name: "Vegan Chocolate Ring", image: "/images/veganchocolate.png", size: "round" },
];

const DozenBoxBuilder = () => {
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [boxShake, setBoxShake] = useState(false);

  const addFlavor = (flavor) => {
    const totalSlotsUsed = selectedFlavors.reduce((sum, item) => sum + (item.size === "long" ? 2 : 1), 0);
    if (totalSlotsUsed + (flavor.size === "long" ? 2 : 1) <= 12) {
      setSelectedFlavors([...selectedFlavors, flavor]);
    } else {
      setBoxShake(true);
      setTimeout(() => setBoxShake(false), 500);
    }
  };

  const removeFlavor = (index) => {
    setSelectedFlavors(selectedFlavors.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    if (selectedFlavors.length < 12) return;

    const orderNotes = selectedFlavors.map(flavor => flavor.name).join(", ");
    
    console.log("Order Notes:", orderNotes); // This would be sent to Square as order notes
    alert(`Order placed with flavors: ${orderNotes}`);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-xl font-bold mb-4">Build Your Dozen Box</h1>
      
      {/* Visual Donut Box */}
      <motion.div 
        className="relative w-[640px] h-[400px] bg-cover bg-center border p-4 rounded-xl flex flex-col justify-end overflow-hidden" 
        style={{ 
          backgroundImage: "url('/images/donutbox.png')", 
          backgroundSize: "cover", 
          backgroundPosition: "center", 
          minHeight: "400px", 
          width: "640px", 
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-end"
        }}
        animate={boxShake ? { x: [0, -5, 5, -5, 0] } : {}}
        transition={{ duration: 0.3 }}
      >
        {/* Donut Placement Restricted to Bottom Half */}
        <div className="grid grid-cols-4 gap-1 p-2 h-[60%] w-full place-items-center">
          {selectedFlavors.map((flavor, index) => (
            <motion.div
              key={index}
              className={`border rounded-lg flex items-center justify-center bg-gray-100 relative ${flavor.size === "long" ? "col-span-2 w-14 h-6" : "col-span-1 w-8 h-8"}`}
              whileTap={{ scale: 0.9 }}
            >
              <motion.img
                src={flavor.image}
                alt={flavor.name}
                className={flavor.size === "long" ? "w-12 h-5" : "w-6 h-6"}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, type: "spring" }}
                onClick={() => removeFlavor(index)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Flavor Selection */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {flavors.map((flavor) => (
          <motion.div
            key={flavor.name}
            className="flex flex-col items-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => addFlavor(flavor)}
          >
            <img src={flavor.image} alt={flavor.name} className="w-10 h-10 rounded-lg" />
            <span className="text-sm mt-1">{flavor.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Checkout Button */}
      <Button className="mt-6" disabled={selectedFlavors.length < 12} onClick={handleCheckout}>
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default DozenBoxBuilder;
