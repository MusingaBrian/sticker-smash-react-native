import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import IconButton from './components/IconButton';
import CircleButton from './components/CircleButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';


export default function App() {

  const [showAppOptions, setshowAppOptions] = useState(false);
  const [selectedImage, setselectedImage] = useState(null);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [pickEmoji, setpickEmoji] = useState(null);

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
  const onSaveImageAsync = async () => {};

  const onModalClose = () => {
    isModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer selectedImage={selectedImage}/>
      </View>
      {showAppOptions ? (
        <View style={styles.OptionsContainer}>
          <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="reset" onPress={onReset}/>
              <CircleButton onPress={onAddSticker}/>
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
        <EmojiList onSelect={setpickEmoji} onModalClose={onModalClose}/>
      </EmojiPicker>
      <StatusBar style="auto" />
    </View>
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
