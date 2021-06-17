import { useState } from "react";
import { categoryCreate } from "../../components/HelperFunctions";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

const CategoryNew = () => {
  let history = useHistory();
  const [startDate, setStartDate] = useState(new Date());
  const [data, setData] = useState({
    title: "",
    description: "",
    color: "#ffffff",
    discount: 0,
    discountExpiration: new Date().toLocaleDateString(),
  });

  // Submit the changes
  const onSubmit = (e) => {
    e.preventDefault();

    categoryCreate(queryString.stringify(data)).then((res) => {
      if (res) {
        history.push("/categories");
      }
    });
  };

  // Submit the changes from date picker
  const onDateChange = (newDate) => {
    let keyName = "discountExpiration";
    let value = newDate.toLocaleDateString();
    setStartDate(newDate);
    setData((previous) => {
      return {
        ...previous,
        [keyName]: value,
      };
    });
  };

  // Change the correspond object field
  const onChange = (e) => {
    let keyName = e.target.name;
    let value = e.target.value;
    setData((previous) => {
      return {
        ...previous,
        [keyName]: value,
      };
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
          <form noValidate onSubmit={onSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">
              Please edit or delete the selected category
            </h1>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Enter title"
                value={data.title}
                required
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                placeholder="Enter description"
                value={data.description}
                required
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="color">Color</label>
              <input
                type="color"
                className="form-control form-control-color"
                name="color"
                value={data.color}
                required
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="discount">Discount (%)</label>
              <input
                type="number"
                className="form-control"
                name="discount"
                value={data.discount}
                required
                min="0"
                max="100"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="discountExpiration">Discount Expiration</label>{" "}
              <DatePicker
                name="discountExpiration"
                value={data.discountExpiration}
                selected={startDate}
                onChange={(date) => onDateChange(date)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-lg btn-secondary btn-block"
            >
              Submit changes
            </button>
          </form>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default CategoryNew;