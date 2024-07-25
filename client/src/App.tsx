import React, { useState } from 'react';
import { Layout, Button, Input, Spin, Typography } from 'antd';
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { Aptos} from "@aptos-labs/ts-sdk";
import { useWallet, InputTransactionData } from "@aptos-labs/wallet-adapter-react";

const { Header, Content } = Layout;
const { Title } = Typography;

const moduleAddress = "903f9346940a83dac717774850def813aea9558de6e2301b060a5b9460bb8c98";

const aptos = new Aptos();

function App() {
  const [poolStatus, setPoolStatus] = useState<{ token_a_amount: number; token_b_amount: number } | null>(null);
  const [initTokenA, setInitTokenA] = useState<string>("");
  const [initTokenB, setInitTokenB] = useState<string>("");
  const [swapAmount, setSwapAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { account, signAndSubmitTransaction } = useWallet();

  const fetchPoolStatus = async () => {
    if (!account) return;

    setLoading(true);
    try {
      const response = await aptos.getAccountResource({
        accountAddress: account.address,
        resourceType: `${moduleAddress}::LiquidityPool::LiquidityPool`
      });
      const { token_a_amount, token_b_amount } = response.data;
      setPoolStatus({ token_a_amount, token_b_amount });
    } catch (error) {
      console.error("Error fetching pool status:", error);
    } finally {
      setLoading(false);
    }
  };

  const initializePool = async () => {
    if (!account) return;

    setLoading(true);
    const transaction: InputTransactionData = {
      data: {
        function: `${moduleAddress}::LiquidityPool::initialize`,
        functionArguments: [initTokenA, initTokenB],
      }
    };
    try {
      const response = await signAndSubmitTransaction(transaction);
      await aptos.waitForTransaction({ transactionHash: response.hash });
      fetchPoolStatus();
    } catch (error) {
      console.error("Error initializing pool:", error);
    } finally {
      setLoading(false);
    }
  };

  const swapTokens = async () => {
    if (!account) return;

    setLoading(true);
    const transaction: InputTransactionData = {
      data: {
        function: `${moduleAddress}::LiquidityPool::swap`,
        functionArguments: [swapAmount],
      }
    };
    try {
      const response = await signAndSubmitTransaction(transaction);
      await aptos.waitForTransaction({ transactionHash: response.hash });
      fetchPoolStatus();
    } catch (error) {
      console.error("Error swapping tokens:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Header>
        <div style={{ textAlign: "center" }}>
          <Title level={1}>Liquidity Pool</Title>
          <WalletSelector />
        </div>
      </Header>
      <Content style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <Input
            placeholder="Token A Amount"
            value={initTokenA}
            onChange={(e) => setInitTokenA(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <Input
            placeholder="Token B Amount"
            value={initTokenB}
            onChange={(e) => setInitTokenB(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <Button
            type="primary"
            onClick={initializePool}
            loading={loading}
          >
            Initialize Pool
          </Button>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Input
            placeholder="Amount to Swap"
            value={swapAmount}
            onChange={(e) => setSwapAmount(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <Button
            type="primary"
            onClick={swapTokens}
            loading={loading}
          >
            Swap Tokens
          </Button>
        </div>
        <div>
          {loading ? (
            <Spin />
          ) : (
            poolStatus && (
              <div>
                <p>Token A Amount: {poolStatus.token_a_amount}</p>
                <p>Token B Amount: {poolStatus.token_b_amount}</p>
              </div>
            )
          )}
        </div>
      </Content>
    </Layout>
  );
}

export default App;
