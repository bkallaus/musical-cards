import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { Destination, gainToDb } from 'tone';
import useLocalStorage from "use-local-storage";

const Container = styled.div`
    position: absolute;
    bottom: 16px;
    right: 16px;
    display: flex;
    align-items: center;
`;

const SliderContainer = styled.div`
    margin-right: 10px;
    display: ${props => props.$visible ? 'flex' : 'none'};
    align-items: center;
    background: white;
    padding: 8px;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
`;

const VolumeButton = styled.button`
    font-size: 32px;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;

    &:focus {
        outline: none;
    }
`;

const VolumeControl = () => {
    // Default to 0 (Muted) to match previous default behavior, or migrate logic manually.
    const [volume, setVolume] = useLocalStorage("MC_VOLUME", 0);
    const [showSlider, setShowSlider] = useState(false);

    useEffect(() => {
        // Map 0-100 to decibels
        // 0 -> -Infinity
        // 100 -> 0 dB
        if (volume <= 0) {
            Destination.volume.value = -Infinity;
        } else {
            // Tone.gainToDb takes a value between 0 and 1
            Destination.volume.value = gainToDb(volume / 100);
        }
    }, [volume]);

    const toggleSlider = () => {
        setShowSlider(!showSlider);
    };

    return (
        <Container>
            <SliderContainer $visible={showSlider}>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    aria-label="Volume"
                />
            </SliderContainer>
            <VolumeButton onClick={toggleSlider} title="Volume">
                {volume > 0 ? <FaVolumeUp /> : <FaVolumeMute />}
            </VolumeButton>
        </Container>
    );
};

export default VolumeControl;
