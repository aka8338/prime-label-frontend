import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

interface Identifier {
  _id: string;
  type: string;
  value: string;
  createdAt: string;
}

interface IdentifierTableProps {
  type: string;
}

const IdentifierTable: React.FC<IdentifierTableProps> = ({ type }) => {
  const [identifiers, setIdentifiers] = useState<Identifier[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchIdentifiers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/identifiers/${type}`
        );
        setIdentifiers(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Error fetching identifiers.");
      }
    };

    if (type) {
      fetchIdentifiers();
    }
  }, [type]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identifiers of Type: {type}</CardTitle>
        <CardDescription>
          {error && <p className="text-red-600">{error}</p>}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-w-4xl mx-auto p-6 border rounded-md shadow-md bg-white">
          <h1 className="text-xl font-bold mb-6">
            Identifiers of Type: {type}
          </h1>

          {/* Error Message */}
          {error && <p className="text-red-600 mb-4">{error}</p>}

          {/* Table */}
          {!identifiers.length ? (
            <p className="text-gray-700">No identifiers found for this type.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {identifiers.map((identifier) => (
                  <TableRow key={identifier._id}>
                    <TableCell>{identifier._id}</TableCell>
                    <TableCell>{identifier.type}</TableCell>
                    <TableCell>{identifier.value}</TableCell>
                    <TableCell>
                      {new Date(identifier.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IdentifierTable;
