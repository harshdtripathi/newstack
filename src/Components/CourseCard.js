import React from 'react';

const CourseCard = ({ cardData, setCurrentCard, currentCard }) => {
  return (
    <div 
      className={`border rounded-2xl p-4  text-left cursor-crosshair shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] ${
        currentCard === cardData.heading ? 'bg-white  hover:scale-95' : 'bg-richBlack-700'
      }`}
      onClick={() => setCurrentCard(cardData.heading)} // Set the current card when clicked
    >
      <h3 className="text-xl font-inter font-bold text-blue-200">{cardData.heading}</h3>
      <p className="text-sm text-richBlack-300 mt-2">{cardData.description}</p>
      <div className='flex flex-row items-baseline justify-between mt-2'>
        {currentCard === cardData.heading ? (
          <>
            <p className="text-sm text-blue-50 font-semibold">Level: {cardData.level}</p>
            <p className="text-sm text-blue-50 font-semibold">Lessons: {cardData.lessonNumber}</p>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold">Level: {cardData.level}</p>
            <p className="text-sm font-semibold">Lessons: {cardData.lessonNumber}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
