 export const statusColors = (status) => {
    switch (status) {
      case "completed":
        return "bg-[#E2FFF0] text-[#27AE60] border-solid border-[#C8FFE1] border-3 text-md px-2 rounded-md";
      case "ongoing":
        return "bg-[#FFE0B3] text-[#CC7A00] border-solid border-[#FFCC80] border-3 text-md px-2 rounded-md";
      case "upcoming":
        return "bg-[#B3E5FC] text-[#0277BD] border-solid border-[#80D8FF] border-3 text-md px-2 rounded-md";
      case "cancelled":
        return "bg-[#FFEBEE] text-[#C62828] border-solid border-[#FFCDD2] border-3 text-md px-2 rounded-md";
      default:
        return "bg-transparent text-black border-solid border-black";
    }
 };
  
 export const bgColors = [
    "bg-green-200 border-green-400 border-2 ",
    "bg-blue-200 border-blue-400 border-2 ",
    "bg-yellow-200 border-yellow-400 border-2 ",
    "bg-purple-200 border-purple-400 border-2",
    "bg-pink-200 border-pink-400 border-2 ",
    "bg-indigo-200 border-indigo-400 border-2 ",
  ];
