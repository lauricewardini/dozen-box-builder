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
      
      {/* Visual Donut Box at the Top */}
      <motion.div 
        className="relative w-[640px] h-[400px] border rounded-xl overflow-hidden flex justify-center items-end mb-6"
        style={{ backgroundImage: "url('/images/donutbox.png')", backgroundSize: "contain", backgroundPosition: "center bottom", backgroundRepeat: "no-repeat" }}
        animate={boxShake ? { x: [0, -5, 5, -5, 0] } : {}}
        transition={{ duration: 0.3 }}
      >
        {/* Defined Space Where Donuts Should Appear */}
        <div className="absolute bottom-0 w-[500px] h-[180px] flex flex-wrap justify-center items-end">
          {selectedFlavors.map((flavor, index) => (
            <motion.img
              key={index}
              src={flavor.image}
              alt={flavor.name}
              className={flavor.size === "long" ? "w-[80px] h-[40px]" : "w-[50px] h-[50px]"}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring" }}
              onClick={() => removeFlavor(index)}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Flavor Selection Below the Box */}
      <div className="grid grid-cols-3 gap-4">
        {flavors.map((flavor) => (
          <motion.div
            key={flavor.name}
            className="flex flex-col items-center cursor-pointer p-2 rounded-lg border shadow-md bg-white hover:bg-gray-100 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => addFlavor(flavor)}
          >
            <img src={flavor.image} alt={flavor.name} className="w-16 h-16 rounded-lg drop-shadow-md" />
            <span className="text-sm font-semibold mt-2 text-gray-700">{flavor.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Checkout Button */}
      <Button className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-full shadow-md hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={selectedFlavors.length < 12} 
        onClick={handleCheckout}>
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default DozenBoxBuilder;
