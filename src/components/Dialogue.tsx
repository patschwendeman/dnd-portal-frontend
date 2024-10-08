import { FunctionComponent, ReactElement, useContext } from 'react'
import styled from 'styled-components'

import { ActiveSceneContext } from '../context/context'
import { SceneDetail } from '../models/models'


interface DialogueProps {
  isVisible: boolean;
  sceneOption: SceneDetail | undefined;
  handleDialogueOption: (option: boolean, sceneOption: SceneDetail | undefined, setActiveSceneId: React.Dispatch<React.SetStateAction<number>>, setDialogueVisibility: React.Dispatch<React.SetStateAction<boolean>>) => void;
  setDialogueVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const LayoutContainer = styled.div<{$isVisible: boolean}>`
  display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.overlay};
  z-index: 99999;
`

const DialogueContainer = styled.div`
  width: 600px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.colors.secondary};
`

const ButtonContainer = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  z-index: 999;
`

const ConfirmButton = styled.button`
  width: 200px;
  height: 50px;
  background-color: ${(props) => props.theme.colors.primary};
  border: none;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.text.color};
  cursor: pointer;
  z-index: 999;
`

const DeclineButton = styled.button`
  width: 200px;
  height: 50px;
  background-color: ${(props) => props.theme.colors.background};
  border: none;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.text.color};
`

const DialogueImage = styled.img`
    width: 100%;
    height: 100%;
`

const Dialogue: FunctionComponent<DialogueProps> = ({ sceneOption, handleDialogueOption, isVisible, setDialogueVisibility }): ReactElement => {
  const { setActiveSceneId } = useContext(ActiveSceneContext)

  const handleConfirm = () => {
    if (!sceneOption) {
      
      throw new Error('Scene option is undefined')
    }
    handleDialogueOption(true, sceneOption, setActiveSceneId, setDialogueVisibility)
  }

  const handleDecline = () => {
    handleDialogueOption(false, sceneOption, setActiveSceneId, setDialogueVisibility)
  }

  return (
    <LayoutContainer $isVisible={isVisible}>
      <DialogueContainer>
        <DialogueImage src={sceneOption?.battlemaps?.source} alt={sceneOption?.name || 'Scene Image'} />
        <p>{sceneOption?.name}</p>
        <ButtonContainer>
          <ConfirmButton data-test-id='confirm-button' onClick={handleConfirm}>Confirm</ConfirmButton>
          <DeclineButton data-test-id='decline-button' onClick={handleDecline}>Decline</DeclineButton>
        </ButtonContainer>
      </DialogueContainer>
    </LayoutContainer>
  )
}

export { Dialogue }
