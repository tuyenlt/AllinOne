import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Coin {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    image: string;
}

const fetchCoins = async (): Promise<Coin[]> => {
    const response = await axios.get<Coin[]>(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 10,
                page: 1,
                sparkline: false,
            },
        }
    );
    return response.data;
};

const CoinAndStock: React.FC = () => {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAndSetCoins = async () => {
            try {
                const data = await fetchCoins();
                setCoins(data);
            } catch (err) {
                setError('Failed to fetch coin list');
            }
        };

        fetchAndSetCoins();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (coins.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className='card'>
            <h2 className='card-header text-center'>Top 10 Cryptocurrencies</h2>
            <ul className='list-group'>
                {coins.map((coin) => (
                    <li className='list-group-item' key={coin.id}>
                        <img src={coin.image} alt={coin.name} width="20" height="20" />
                        {coin.name} ({coin.symbol.toUpperCase()}): ${coin.current_price}
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default CoinAndStock