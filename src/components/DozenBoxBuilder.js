import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "./ui/Button";

const flavors = [
  { name: "Devil's Food Peanut", image: "/images/devilsfoodpeanut.png", size: "round" },
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
        className="relative w-[640px] h-[400px] border rounded-xl overflow-hidden flex justify-center items-end"
        style={{ backgroundImage: "url('/images/donutbox.png')", backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
        animate={boxShake ? { x: [0, -5, 5, -5, 0] } : {}}
        transition={{ duration: 0.3 }}
      >
        {/* Defined Space Where Donuts Should Appear */}
        <div className="absolute bottom-[40px] w-[500px] h-[200px] flex flex-wrap justify-center items-center">
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
