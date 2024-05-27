import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import * as ImagePicker from 'expo-image-picker'
import { useState, useRef } from 'react'
import IconButton from './components/IconButton';
import CircleButton from './components/CircleButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';


export default function App() {

  const [showAppOptions, setshowAppOptions] = useState(false);
  const [selectedImage, setselectedImage] = useState(null);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [pickedEmoji, setpickedEmoji] = useState(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef();

  if (status === null) {
    requestPermission();
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if(!result.canceled) {
      setselectedImage(result.assets[0].uri);
      setshowAppOptions(true);
    } else {
      alert('You did not select ant image!!!');
    }
  }

  const onReset = () => {
    setshowAppOptions(false);
  };
  const onAddSticker = () => {
    setisModalVisible(true);
  };
  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);

      if (localUri) {
        alert('saved!');
      }
    } catch (error) {
      console.log(e);
    }
  };

  const onModalClose = () => {
    setisModalVisible(false);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View ref={imageRef} collapsable={false}>
            <ImageViewer selectedImage={selectedImage}/>
            {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji}/>}
          </View>
        </View>
        {showAppOptions ? (
          <View style={styles.OptionsContainer}>
            <View style={styles.optionsRow}>
                <IconButton icon="refresh" label="reset" onPress={onReset}/>
                <CircleButton onPress={onAddSticker} icon="add"/>
                <IconButton icon="save-alt" label="save" onPress={onSaveImageAsync}/>
            </View>
          </View>
        ) : (  
          <View style={styles.footerContainer}>
            <Button theme="primary" label="Choose a photo" onPress={pickImageAsync}></Button>
            <Button label="Use this photo" onPress={() => setshowAppOptions(true)}></Button>
          </View>
        )}
        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList onSelect={setpickedEmoji} onCloseModal={onModalClose}/>
        </EmojiPicker>
        <StatusBar style="auto" />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  OptionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  }
});
