import React, { useEffect, useState } from "react";
import { db, auth } from "../../../firebase/config";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

type Player = {
  id: string;
  Name: string;
  Wins: number;
};

export const Ranking: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentUser, setCurrentUser] = useState<Player | null>(null);
  const [position, setPosition] = useState<number | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const scoringRef = collection(db, "scoringHistory");
        const q = query(scoringRef, orderBy("Wins", "desc"), limit(3));
        const snapshot = await getDocs(q);

        const allPlayers: Player[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            Name: data.Name,
            Wins: data.Wins,
          };
        });

        setPlayers(allPlayers);

        // Buscar al usuario actual en la lista
        const index = allPlayers.findIndex((p) => p.id === user.email);
        if (index !== -1) {
          setCurrentUser(allPlayers[index]);
          setPosition(index + 1); // posición en ranking (1-based)
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>🏆 Ranking General</h2>
      <ul>
        {players.map((p, i) => (
          <li key={p.id}>
            {i + 1}. {p.Name} — {p.Wins} victorias
          </li>
        ))}
      </ul>

      {currentUser && position && (
        <div style={{ marginTop: "20px", fontWeight: "bold", color: "white" }}>
          👤 Tu posición: {position}  
          <br />
          {currentUser.Name} — {currentUser.Wins} victorias
        </div>
      )}
    </div>
  );
};
