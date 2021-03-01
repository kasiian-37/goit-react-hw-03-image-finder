// Styles
import "./ImageGalleryStyles.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

// Utilities components
import { Component } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

// Custom Components
import Loader from "react-loader-spinner";
import ImageGalleryItem from "../ImageGalleryItem";
import Button from "../Button";

export default class ImageGallery extends Component {
  static propTypes = {
    pictures: PropTypes.arrayOf(PropTypes.object),
    status: PropTypes.string.isRequired,
    error: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    onLoadMore: PropTypes.func.isRequired,
  };

  handleImageClick = (evt) => {
    if (evt.target.tagName === "IMG") {
      this.props.onClick(evt.target.dataset.url, evt.target.alt);
    }
  };

  render() {
    const { pictures, error, status } = this.props;

    if (status === "idle") {
      return <div className="message">Good luck!</div>;
    }

    if (status === "pending") {
      return (
        <Loader
          type="ThreeDots"
          color="#00ffff"
          height={120}
          width={120}
          style={{ textAlign: "center" }}
        />
      );
    }
    if (status === "rejected") {
      return toast.error(error);
    }

    if (status === "resolved" && pictures.length !== 0) {
      return (
        <>
          <ul className="ImageGallery" onClick={this.handleImageClick}>
            {pictures.map((picture) => (
              <ImageGalleryItem
                id={toString(picture.id)}
                url={picture.webformatURL}
                tags={picture.tags}
                largeImgUrl={picture.largeImageURL}
              />
            ))}
          </ul>
          <Button onClick={this.props.onLoadMore} />
        </>
      );
    } else {
      return <div className="message">Sorry, no results were found...</div>;
    }
  }
}
