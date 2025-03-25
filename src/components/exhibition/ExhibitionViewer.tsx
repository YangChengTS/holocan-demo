import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Environment, PerspectiveCamera, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// PlaceHolder for 3D models when not loaded
const PlaceHolderBox = ({ position, size = [1, 1, 1], color = '#366cbb', children, onClick }: any) => {
  return (
    <mesh position={position} onClick={onClick}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
      {children}
    </mesh>
  );
};

// Booth Component
const Booth = ({ position, size, name, country, onClick }: any) => {
  return (
    <group position={position}>
      <PlaceHolderBox position={[0, 0.5, 0]} size={[size[0], 1, size[2]]} color={country === 'CN' ? '#ac2317' : '#366cbb'} onClick={onClick} />
      <PlaceHolderBox position={[0, 1.5, 0]} size={[size[0] * 0.8, 0.2, size[2] * 0.8]} color="#2b2d42" />
      
      <Html position={[0, 2, 0]} center transform occlude>
        <div className="flex flex-col items-center pointer-events-none">
          <div className="bg-background-dark/70 backdrop-blur-sm rounded-lg px-3 py-1 text-center">
            <p className="text-white text-sm font-semibold whitespace-nowrap">{name}</p>
            <p className="text-xs text-text-secondary">{country === 'CN' ? '中国' : '加拿大'}</p>
          </div>
        </div>
      </Html>
    </group>
  );
};

// Floor
const Floor = () => {
  const texture = useTexture({
    map: '/canda_photo (1).png',
  });
  
  // Scale and optimize texture
  texture.map.wrapS = texture.map.wrapT = THREE.RepeatWrapping;
  texture.map.repeat.set(8, 8);
  texture.map.encoding = THREE.sRGBEncoding;
  
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial {...texture} color="#111" roughness={0.9} metalness={0.1} opacity={0.3} transparent />
    </mesh>
  );
};

// Scene for different zones
const ExhibitionScene = ({ activeZone, onBoothClick }: { activeZone: string, onBoothClick: (booth: any) => void }) => {
  // Reference to camera
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  
  // Camera positions for different zones
  useEffect(() => {
    if (cameraRef.current) {
      if (activeZone === 'overview') {
        cameraRef.current.position.set(0, 15, 15);
        cameraRef.current.lookAt(0, 0, 0);
      } else if (activeZone === 'canadian') {
        cameraRef.current.position.set(-8, 5, 10);
        cameraRef.current.lookAt(-8, 0, 0);
      } else if (activeZone === 'chinese') {
        cameraRef.current.position.set(8, 5, 10);
        cameraRef.current.lookAt(8, 0, 0);
      } else if (activeZone === 'meeting') {
        cameraRef.current.position.set(0, 5, -12);
        cameraRef.current.lookAt(0, 0, -5);
      }
    }
  }, [activeZone]);

  // Canadian booths
  const canadianBooths = [
    { id: 1, name: '枫叶食品公司', position: [-8, 0, -2], size: [3, 2, 3], country: 'CA' },
    { id: 2, name: '北极湾渔业', position: [-12, 0, 2], size: [3, 2, 3], country: 'CA' },
    { id: 3, name: '清风能源', position: [-5, 0, 5], size: [3, 2, 3], country: 'CA' },
  ];

  // Chinese booths
  const chineseBooths = [
    { id: 4, name: '睿智科技', position: [8, 0, -2], size: [3, 2, 3], country: 'CN' },
    { id: 5, name: '绿源能源科技', position: [12, 0, 2], size: [3, 2, 3], country: 'CN' },
    { id: 6, name: '海洋生物科技', position: [5, 0, 5], size: [3, 2, 3], country: 'CN' },
  ];

  // Meeting rooms
  const meetingRooms = [
    { id: 7, name: '会议室 A', position: [-4, 0, -12], size: [4, 3, 4], country: 'MEET' },
    { id: 8, name: '会议室 B', position: [4, 0, -12], size: [4, 3, 4], country: 'MEET' },
  ];

  return (
    <>
      <PerspectiveCamera 
        makeDefault 
        ref={cameraRef} 
        position={[0, 15, 15]} 
        fov={50}
      />
      <OrbitControls 
        enableZoom={true} 
        enablePan={true} 
        enableRotate={true}
        minDistance={5}
        maxDistance={30}
      />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      
      <Environment preset="city" />
      
      {/* Center area */}
      <PlaceHolderBox position={[0, 0, 0]} size={[5, 0.1, 5]} color="#1a1a1a" />
      <Html position={[0, 1, 0]} center>
        <div className="bg-primary px-3 py-2 rounded-full text-white text-sm">
          HoloCAN 虚拟展厅
        </div>
      </Html>
      
      {/* Floor */}
      <Floor />
      
      {/* Canadian zone */}
      {canadianBooths.map((booth) => (
        <Booth key={booth.id} {...booth} onClick={() => onBoothClick(booth)} />
      ))}
      
      {/* Chinese zone */}
      {chineseBooths.map((booth) => (
        <Booth key={booth.id} {...booth} onClick={() => onBoothClick(booth)} />
      ))}
      
      {/* Meeting zone */}
      {meetingRooms.map((room) => (
        <Booth key={room.id} {...room} onClick={() => onBoothClick(room)} />
      ))}
      
      {/* Zone labels */}
      <Html position={[-10, 0.5, -5]} center>
        <div className="bg-primary/30 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-center">
          加拿大企业区
        </div>
      </Html>
      
      <Html position={[10, 0.5, -5]} center>
        <div className="bg-secondary/30 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-center">
          中国企业区
        </div>
      </Html>
      
      <Html position={[0, 0.5, -15]} center>
        <div className="bg-accent/30 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-center">
          商务会议区
        </div>
      </Html>
    </>
  );
};

// Main Exhibition Viewer component
const ExhibitionViewer = ({ activeZone = 'overview' }: { activeZone: string }) => {
  const [selectedBooth, setSelectedBooth] = useState<any>(null);
  
  const handleBoothClick = (booth: any) => {
    setSelectedBooth(booth);
  };

  return (
    <div className="relative w-full h-full">
      <Canvas shadows>
        <ExhibitionScene activeZone={activeZone} onBoothClick={handleBoothClick} />
      </Canvas>
      
      {selectedBooth && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute top-4 left-4 bg-background-dark/80 backdrop-blur-sm p-4 rounded-lg max-w-xs"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">{selectedBooth.name}</h3>
            <button 
              onClick={() => setSelectedBooth(null)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <p className="text-text-secondary text-sm mb-3">
            {selectedBooth.country === 'CA' && '加拿大企业展区'}
            {selectedBooth.country === 'CN' && '中国企业展区'}
            {selectedBooth.country === 'MEET' && '商务会议区'}
          </p>
          <button className="btn btn-xs btn-primary w-full rounded-lg">
            查看详情
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ExhibitionViewer; 