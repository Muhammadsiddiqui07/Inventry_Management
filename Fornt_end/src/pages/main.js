import React, { useState } from "react";
import { Layout } from "antd";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import AddItemForm from "../components/AddItemForm";

const { Content } = Layout;

const MainPage = () => {
    const [inventory, setInventory] = useState([]);

    const addItem = (item) => {
        setInventory([...inventory, item]);
    };

    const updateItem = (updatedItem) => {
        setInventory((prevInventory) =>
            prevInventory.map((item) =>
                item.id === updatedItem.id ? updatedItem : item
            )
        );
        console.log("Updated Item:", updatedItem);
    };


    const deleteItem = (id) => {
        setInventory(inventory.filter((item) => item.id !== id));
    };

    return (
        <Layout>
            <Header />
            <Content style={{ padding: "20px" }}>
                <AddItemForm addItem={addItem} />
                <Dashboard
                    inventory={inventory}
                    updateItem={updateItem}
                    deleteItem={deleteItem}
                />
            </Content>
        </Layout>
    );
};

export default MainPage;
