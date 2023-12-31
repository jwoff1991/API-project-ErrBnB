import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getReviews } from "../../store/reviews";
import "./SpotReviews.css";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import PostReviewModal from "../PostReviewModal";
import DeleteReviewModal from "../DeleteReviewModal";

export default function SpotReviews() {
  const spotId = useParams().spotId;
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.spot);
  const ownerId = useSelector((state) => state.spots.singleSpot.ownerId);
  const currentUser = useSelector((state) => state.session.user);



  let currentUserId;
  if (currentUser && currentUser.id) {
    currentUserId = currentUser.id;
  }
  const props = { spotId, currentUserId };

  useEffect(() => {
    dispatch(getReviews(spotId));
  }, [dispatch, spotId]);

  //checks if the user has a review or is owner of a review
  const reviewsList = Object.values(reviews);
  const hasAReview = reviewsList.find((review) => {
    return review.userId === currentUserId;
  });
  const isOwner = (ownerId === currentUserId);

  //converts date to a more readable format
  const commentDateConverter = (date) => {
    const dateObject = new Date(date);
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = monthNames[dateObject.getMonth()];
    const day = String(dateObject.getDate()).padStart(2, '0');

    return `${month} ${day}`;
}

  if (!reviewsList.length) {
    return (
      <>
        {currentUser && isOwner &&<></>}
        {currentUser && currentUserId  && !isOwner && (
          <>
            <button className="post-your-review-button">
              <OpenModalMenuItem
                itemText="Post Your Review"
                modalComponent={<PostReviewModal props={props} />}
              />
            </button>
            <div>Be the first to post a review!</div>
          </>
        )}
      </>
    );
  }

  return (
    <div>
      <div className="div-post-your-review-button">
        {currentUser &&
          typeof currentUserId === "null" &&
          isOwner && <></>}
        {currentUser && hasAReview === undefined && (
          <>
            <button className="post-your-review-button">
              <OpenModalMenuItem
                itemText="Post Your Review"
                modalComponent={<PostReviewModal props={props} />}
              />
            </button>
          </>
        )}
      </div>
      <div className="reviews-div-holder">
        {reviewsList.map(({ id, review, User, createdAt, spotId }) => (
          <div key={id} className="spot-single-review-div">
            <div className="spot-single-review-firstname">{User.firstName}</div>
            <div className="spot-single-review-created-date">{commentDateConverter(createdAt)}</div>
            <div className="spot-single-review">{review}</div>
            {User.id === currentUserId && (
              <>
                <button className="review-update-button">Update</button>
                <button className="review-delete-button">
                  {" "}
                  <OpenModalMenuItem
                    itemText="Delete"
                    modalComponent={
                      <DeleteReviewModal props={{ id, spotId }} />
                    }
                  />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
