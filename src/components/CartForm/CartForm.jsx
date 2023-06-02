import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { resetData, saveFormData } from "../../redux/features/cart/cartSlice";
import { Form, Label } from "./CartForm.styled";

const CartForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "380",
    address: "",
  });
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.cart.formData);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
    };

    if (
      data.email === "" ||
      data.phone === "" ||
      data.address === "" ||
      data.name === ""
    ) {
      toast.error("Enter your data");
      return;
    }

    dispatch(saveFormData(data));
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
    });

    const userDataString = JSON.stringify(data);
    localStorage.setItem("userData", userDataString);
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (Object.keys(userData).length === 0) {
      toast.error("You need to save data first");
      return;
    }
    dispatch(resetData());
    localStorage.removeItem("userData");
    toast.success("Your data has been reset");
  };

  return (
    <Form>
      <Label htmlFor="name">Name</Label>
      <TextField
        type="text"
        variant="outlined"
        placeholder="Enter your name"
        id="name"
        value={formData.name}
        onChange={handleChange}
      ></TextField>
      <Label htmlFor="email">Email</Label>
      <TextField
        type="text"
        variant="outlined"
        placeholder="Enter your email"
        id="email"
        value={formData.email}
        onChange={handleChange}
      ></TextField>
      <Label htmlFor="phone">Phone</Label>
      <TextField
        type="number"
        variant="outlined"
        placeholder="Enter your phone"
        id="phone"
        value={formData.phone}
        onChange={handleChange}
      ></TextField>
      <Label htmlFor="address">Address</Label>
      <TextField
        type="text"
        variant="outlined"
        placeholder="Enter your Address"
        id="address"
        value={formData.address}
        onChange={handleChange}
      ></TextField>
      <Button
        onClick={handleSubmit}
        sx={{ marginTop: "10px" }}
        variant="contained"
        type="submit"
      >
        Save my data
      </Button>
      <Button
        onClick={handleReset}
        sx={{ marginTop: "10px" }}
        variant="contained"
        type="submit"
      >
        Reset data
      </Button>
    </Form>
  );
};

export default CartForm;
