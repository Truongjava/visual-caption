import styled from "styled-components";
import api from "../services/api";
import { useState, useEffect } from "react";

const DashboardContainer = styled.div`
  padding: 2rem;
`;

const Header = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
`;

const SubHeader = styled.div`
  color: #666;
  margin-bottom: 2rem;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  border-bottom: 2px solid #ddd;
  background: #f9f9f9;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #ddd;
`;

const ViewButton = styled.button`
  background: #111827;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
`;

const Pagination = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-end;

  button {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    background: white;
    cursor: pointer;
    &:hover {
      background: #f9f9f9;
    }
  }
`;

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.getHistory();
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = async (id) => {
    try {
      const response = await api.getHistoryDetail(id);
      // Here you can implement how to display the detail
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching detail:", error);
    }
  };

  return (
    <DashboardContainer>
      <Header>Content Dashboard</Header>
      <SubHeader>All content you've generated</SubHeader>
      <SearchBar type="text" placeholder="Search..." />
      <Table>
        <thead>
          <tr>
            <Th>Tool</Th>
            <Th>Prompt</Th>
            <Th>Created</Th>
            <Th>View</Th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item.id}>
              <Td>{item.tool}</Td>
              <Td>{item.prompt}</Td>
              <Td>{item.created}</Td>
              <Td>
                <ViewButton onClick={() => handleViewDetail(item.id)}>
                  View
                </ViewButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        Page 1 of 1<button>{"<<"}</button>
        <button>{"<"}</button>
        <button>{">"}</button>
        <button>{">>"}</button>
      </Pagination>
    </DashboardContainer>
  );
};

export default Dashboard;
