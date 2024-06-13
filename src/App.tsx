import { useEffect, useState } from "react";
import "./App.scss";
import Input from "./components/shared/Input/Input";
import CustomerCart from "./components/shared/CustomerCart/CustomerCart";

const initialCustomerData: ICustomerData = {
  name: "",
  email: "",
  bonus: 0,
};

interface ICustomerData {
  name: string;
  email: string;
  bonus: number;
}

interface Errors {
  name?: boolean;
  email?: boolean;
}

function App() {
  const [customersData, setCustomersData] = useState<ICustomerData[]>([]);
  const [customerData, setCustomerData] =
    useState<ICustomerData>(initialCustomerData);
  const [errors, setErrors] = useState<Errors>({});

  const handleUpdateCustomerData = (field: string, value: string) => {
    setErrors({});
    setCustomerData({ ...customerData, [field]: value });
  };

  const handleAddCustomer = () => {
    const validationErrors: Errors = {};
    if (!validateName(customerData.name)) {
      validationErrors.name = true;
    }

    if (!validateEmail(customerData.email)) {
      validationErrors.email = true;
    }
    setErrors(validationErrors);

    if (!validationErrors.email && !validationErrors.name) {
      setCustomerData(initialCustomerData);
      const newCustomers = [...customersData, customerData];
      setCustomersData(newCustomers);
      localStorage.setItem("customers", JSON.stringify(newCustomers));
    }
  };

  const handleAddBonus = (email: string) => {
    let customer = customersData.find(
      (customerData) => customerData.email === email
    );
    if (customer) {
      customer.bonus += 1;
    }
    setCustomersData([...customersData]);
  };

  const handleDeleteCard = (email: string) => {
    let newCustomers = customersData.filter((item) => item.email !== email);
    setCustomersData(newCustomers);
  };

  const validateName = (name: string): boolean => {
    const namePattern = /^[A-Za-z]+( [A-Za-z]+)?$/;
    return namePattern.test(name);
  };

  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  useEffect(() => {
    const customers = localStorage.getItem("customers");
    if (customers) {
      setCustomersData(JSON.parse(customers));
    }
  }, []);

  const totalBonus = customersData.reduce((sum, item) => sum + item.bonus, 0);
  return (
    <div className="App">
      <p className="cart-header">Total bonus: {totalBonus}</p>
      <div className="container">
        <div className="customer-info">
          <div className="customer-block">
            <div className="customer-fields">
              <Input
                name="Name"
                value={customerData.name}
                setValue={(value) => handleUpdateCustomerData("name", value)}
                label={errors?.name ? "Incorrect name" : ""}
              />
              <Input
                name="Email"
                value={customerData.email}
                setValue={(value) => handleUpdateCustomerData("email", value)}
                label={errors?.email ? "Incorrect email" : ""}
              />
            </div>
            <button className="add-btn" onClick={handleAddCustomer}>
              add
            </button>
          </div>
        </div>
        <div className="customer-cards">
          {customersData.map((customerData, idx) => (
            <CustomerCart
              key={customerData.email}
              name={customerData.name}
              email={customerData.email}
              bonus={customerData.bonus}
              idx={idx}
              onDelete={handleDeleteCard}
              onAddBonus={handleAddBonus}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
