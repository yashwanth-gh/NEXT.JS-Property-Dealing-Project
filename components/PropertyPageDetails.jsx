import React, { useState } from 'react';
import {
  FaAngleDoubleDown, FaAngleDoubleUp, FaBed, FaCheckCircle, FaMapPin, 
  FaRegBuilding, FaRulerCombined, FaShower 
} from 'react-icons/fa';
import PropertyMap from './PropertyMap';
import PropertyReviews from './PropertyReviews';
import PropertyRating from './PropertyRating'; 
import Image from 'next/image';
import { formatTimeElapsed } from '@/utils/calculateTime';
import PropertyReviewButton from './PropertyReviewButton';

const formatNumberToIndian = (number) => number.toLocaleString('en-IN');

const PropertyPageDetails = ({ property }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  const toggleDescription = () => setShowFullDescription(prev => !prev);
  const toggleAmenities = () => setShowAllAmenities(prev => !prev);

  const amenitiesToShow = showAllAmenities ? property?.amenities : property?.amenities?.slice(0, 6);
  const recentReviews = property?.reviews?.slice(0, 2);

  return (
    <main>
      {/* Property Info Section */}
      <div className="bg-primary-foreground p-2 md:p-6 rounded-lg shadow-md text-center md:text-left">
        <div className="text-border mb-4 flex justify-between items-center">
          <span>
          <FaRegBuilding className='inline-block mr-2' />{property?.type}
          </span>
          <PropertyRating rating={property?.rating} textSize='text-md'/>
        </div>
        <h1 className="text-3xl font-extrabold mb-4">{property?.name}</h1>
        <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
          <p className="text-destructive">
            <FaMapPin className='inline mr-2' />
            {`${property?.location?.street}, ${property?.location?.city} - ${property?.location?.zipcode}, ${property?.location?.state}`}
          </p>
        </div>

        <h3 className="text-lg font-bold my-6 bg-primary text-white p-2">Rates & Options</h3>
        <div className="flex flex-col md:flex-row justify-around flex-wrap">
          {property?.rates?.nightly && (
            <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
              <div className="text-3xl font-bold text-foreground">₹{formatNumberToIndian(property.rates.nightly)}</div>
              <div className="text-foreground mr-2 font-medium self-end">&nbsp;/nightly</div>
            </div>
          )}
          {property?.rates?.weekly && (
            <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
              <div className="text-3xl font-bold text-foreground">₹{formatNumberToIndian(property.rates.weekly)}</div>
              <div className="text-primary mr-2 font-medium self-end">&nbsp;/weekly</div>
            </div>
          )}
          {property?.rates?.monthly && (
            <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
              <div className="text-3xl font-bold text-foreground">₹{formatNumberToIndian(property.rates.monthly)}</div>
              <div className="text-primary mr-2 font-medium self-end">&nbsp;/monthly</div>
            </div>
          )}
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-primary-foreground p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Description & Details</h3>
        <div className="flex justify-center gap-8 lg:gap-10 mb-4">
          <InfoBadge icon={FaBed} label={`${property?.beds} Beds`} />
          <InfoBadge icon={FaShower} label={`${property?.baths} Baths`} />
          <InfoBadge icon={FaRulerCombined} label={`${property?.square_feet} sqft`} />
        </div>

        <p className="mb-4">
          {showFullDescription ? property?.description : `${property?.description?.substring(0, 150)}...`}
        </p>
        <ToggleButton
          isExpanded={showFullDescription}
          toggleAction={toggleDescription}
          label="description"
        />
      </div>

      {/* Amenities Section */}
      <div className="bg-primary-foreground p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Amenities</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none">
          {amenitiesToShow?.map((amenity, index) => (
            <li key={index} className='font-semibold mx-1 my-2'>
              <FaCheckCircle className='text-foreground inline mr-2 text-xl' />
              {amenity}
            </li>
          ))}
        </ul>
        {property?.amenities?.length > 6 && (
          <ToggleButton
            isExpanded={showAllAmenities}
            toggleAction={toggleAmenities}
            label="amenities"
          />
        )}
      </div>

      {/* Reviews Section */}
      <div className="bg-primary-foreground p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Reviews</h3>
        <div className="reviews-list">
          {Array.isArray(recentReviews) && recentReviews.length > 0 ? (
            recentReviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
        {Array.isArray(property?.reviews) && property?.reviews?.length > 2 && (
          <PropertyReviews reviews={property?.reviews} />
        )}
        <PropertyReviewButton property={property} />
      </div>

      {/* Map Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <PropertyMap property={property} />
      </div>
    </main>
  );
};

const InfoBadge = ({ icon: Icon, label }) => (
  <p className="flex flex-col justify-center items-center text-center">
    <Icon className="hidden md:inline ml-2 text-border" />
    <span className="inline text-lg md:text-xl font-bold">{label}</span>
  </p>
);

const ToggleButton = ({ isExpanded, toggleAction, label }) => (
  <button
    className="text-blue-500 font-bold underline cursor-pointer flex items-center"
    onClick={toggleAction}
  >
    {isExpanded ? `Show Less ${label}` : `Show More ${label}`}
    {isExpanded ? <FaAngleDoubleUp className="ml-2" /> : <FaAngleDoubleDown className="ml-2" />}
  </button>
);

const ReviewCard = ({ review }) => (
  <div className="review mb-4">
    <div className="review-header flex items-center mb-2 justify-start">
      <Image
        src={review?.user?.image}
        alt={review?.user?.username}
        className="review-avatar  w-35 h-35 md:w-[50px] md:h-auto "
        width={35}
        height={35}
        sizes='50vw'
      />
      <div className="ml-3 inline">
        <h3 className="font-semibold text-sm md:text-md">{review?.user?.username}</h3>
        <p className="text-gray-500 text-sm md:text-md">{formatTimeElapsed(review?.createdAt)}</p>
      </div>
    </div>
    <PropertyRating rating={review?.rating} />
    <p className="pl-1.5">{review?.reviewText}</p>
  </div>
);

export default PropertyPageDetails;
