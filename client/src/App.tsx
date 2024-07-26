import React, { useState } from 'react';
import { Layout, Button, Input, Tabs, Spin, Select, Card, Row, Col, Typography } from 'antd';

const { Header, Content, Footer } = Layout;
const { Option } = Select;
const { Title } = Typography;

type TokenType = 'tokenA' | 'tokenB';

interface User {
    id: number;
    tokenA: number;
    tokenB: number;
}

interface PoolStatus {
    tokenA: number;
    tokenB: number;
}

const DEXApp: React.FC = () => {
    const [initAmounts, setInitAmounts] = useState({ tokenA: '', tokenB: '' });
    const [swapAmount, setSwapAmount] = useState('');
    const [swapToken, setSwapToken] = useState<TokenType>('tokenA');
    const [poolStatus, setPoolStatus] = useState<PoolStatus>({ tokenA: 0, tokenB: 0 });
    const [transactionInProgress, setTransactionInProgress] = useState(false);
    const [users, setUsers] = useState<User[]>([
        { id: 1, tokenA: 100, tokenB: 100 },
        { id: 2, tokenA: 100, tokenB: 100 },
        { id: 3, tokenA: 100, tokenB: 100 },
    ]);
    const [selectedUser, setSelectedUser] = useState<number>(1);
    const [selectedSwapUser, setSelectedSwapUser] = useState<number | null>(null);

    const initializePool = () => {
        console.log('Pooling tokens from user', selectedUser, 'with', initAmounts.tokenA, initAmounts.tokenB);
        setTransactionInProgress(true);
        setTimeout(() => {
            setUsers(users.map(user => {
                if (user.id === selectedUser) {
                    return {
                        ...user,
                        tokenA: user.tokenA - Number(initAmounts.tokenA),
                        tokenB: user.tokenB - Number(initAmounts.tokenB)
                    };
                }
                return user;
            }));
            setPoolStatus(prevStatus => ({
                tokenA: prevStatus.tokenA + Number(initAmounts.tokenA),
                tokenB: prevStatus.tokenB + Number(initAmounts.tokenB)
            }));
            setTransactionInProgress(false);
        }, 1000);
    };

    const swapTokens = () => {
        if (selectedSwapUser === null) return;

        console.log(`Swapping ${swapAmount} of ${swapToken} for the other token by user ${selectedSwapUser}`);
        setTransactionInProgress(true);
        setTimeout(() => {
            const user = users.find(u => u.id === selectedSwapUser);
            if (user) {
                const fromToken: TokenType = swapToken;
                const toToken: TokenType = fromToken === 'tokenA' ? 'tokenB' : 'tokenA';
                const fromTokenAmount = Number(swapAmount);
                const toTokenAmount = (fromTokenAmount * poolStatus[toToken]) / poolStatus[fromToken];

                // Update pool and user balances
                setUsers(users.map(u => u.id === selectedSwapUser ? { ...u, [fromToken]: u[fromToken] - fromTokenAmount, [toToken]: u[toToken] + toTokenAmount } : u));
                setPoolStatus({ ...poolStatus, [fromToken]: poolStatus[fromToken] + fromTokenAmount, [toToken]: poolStatus[toToken] - toTokenAmount });
            }
            setTransactionInProgress(false);
        }, 1000);
    };

    return (
        <Layout style={{ minHeight: '80vh', background: '#333333', width: '65%', marginLeft: '350px'}}>
            <Header style={{ backgroundColor: '#333333', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80px' }}>
                <Title level={1} style={{ color: '#fff', margin: 0 }}>CryptiFlux</Title>
            </Header>
            <Content style={{ padding: '50px', borderRadius: '40px', backgroundColor: '#585858' }}>
                <Card style={{ marginBottom: '20px', backgroundColor: '#858585', borderRadius: '15px' }}>
                    <Tabs defaultActiveKey="1" items={[
                        {
                            key: "1",
                            label: <span style={{ color: '#fff' }}>Pool</span>,
                            children: (
                                <div>
                                    <Select
                                        value={selectedUser}
                                        onChange={(value) => setSelectedUser(value)}
                                        style={{ width: '100%', marginBottom: '10px' }}
                                        options={users.map(user => ({
                                            value: user.id,
                                            label: `User ${user.id}`
                                        }))}
                                    />
                                    <Input
                                        placeholder="Token A Amount"
                                        value={initAmounts.tokenA}
                                        onChange={(e) => setInitAmounts({ ...initAmounts, tokenA: e.target.value })}
                                        style={{ marginBottom: '10px' }}
                                    />
                                    <Input
                                        placeholder="Token B Amount"
                                        value={initAmounts.tokenB}
                                        onChange={(e) => setInitAmounts({ ...initAmounts, tokenB: e.target.value })}
                                        style={{ marginBottom: '10px' }}
                                    />
                                    <Button
                                        type="primary"
                                        onClick={initializePool}
                                        loading={transactionInProgress}
                                        block
                                        style={{ backgroundColor: '#1a1919', borderColor: '#1a1919' }}
                                    >
                                        Pool Token
                                    </Button>
                                </div>
                            )
                        },
                        {
                            key: "2",
                            label: <span style={{ color: '#fff' }}>Swap</span>,
                            children: (
                                <div>
                                    <Select
                                        placeholder="Select User"
                                        onChange={(value) => setSelectedSwapUser(value)}
                                        style={{ width: '100%', marginBottom: '10px' }}
                                        options={users.map(user => ({
                                            value: user.id,
                                            label: `User ${user.id}`
                                        }))}
                                    />
                                    <Select
                                        value={swapToken}
                                        onChange={(value) => setSwapToken(value as TokenType)}
                                        style={{ width: '120px', marginBottom: '10px' }}
                                        options={[
                                            { value: 'tokenA', label: 'Token A' },
                                            { value: 'tokenB', label: 'Token B' }
                                        ]}
                                    />
                                    <Input
                                        placeholder="Amount to Swap"
                                        value={swapAmount}
                                        onChange={(e) => setSwapAmount(e.target.value)}
                                        style={{ marginBottom: '10px', width: 'calc(100% - 130px)', marginLeft: '10px' }}
                                    />
                                    <Button
                                        type="primary"
                                        onClick={swapTokens}
                                        loading={transactionInProgress}
                                        block
                                        style={{ backgroundColor: '#1a1919', borderColor: '#1a1919' }}
                                    >
                                        Swap Tokens
                                    </Button>
                                </div>
                            )
                        }
                    ]} />
                </Card>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Card title={<span style={{ color: '#fff' }}>Pool Status</span>} bordered={false} style={{ backgroundColor: '#858585', borderRadius: '15px' }}>
                            {transactionInProgress ? (
                                <Spin />
                            ) : (
                                <div style={{ color: '#fff' }}>
                                    <p>Token A Amount: {poolStatus.tokenA}</p>
                                    <p>Token B Amount: {poolStatus.tokenB}</p>
                                </div>
                            )}
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title={<span style={{ color: '#fff' }}>Users</span>} bordered={false} style={{ backgroundColor: '#858585', borderRadius: '15px' }}>
                            <Tabs items={users.map((user) => ({
                                key: user.id.toString(),
                                label: <span style={{ color: '#fff' }}>User {user.id}</span>,
                                children: (
                                    <div style={{ color: '#fff' }}>
                                        <p>Token A: {user.tokenA}</p>
                                        <p>Token B: {user.tokenB}</p>
                                    </div>
                                )
                            }))} />
                        </Card>
                    </Col>
                </Row>
            </Content>
            <Footer style={{ textAlign: 'center', color: '#fff', backgroundColor: '#333333',  display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                CryptiFlux ©2024 Created by Pratham Vishwakarma
            </Footer>
        </Layout>
    );
};

export default DEXApp;
