/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { utils } from '@react-native-firebase/app';
import vision from '@react-native-firebase/ml-vision';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

async function processDocument(localPath) {
  // const processed = await vision().cloudDocumentTextRecognizerProcessImage(localPath); cloud api
  const processed = await vision().textRecognizerProcessImage(localPath);
  console.log({ processed })
  console.log('Found text in document: ', processed.text);

  processed.blocks.forEach(block => {
    console.log('Found block with text: ', block.text);
    // console.log('Confidence in block: ', block.confidence);
    // console.log('Languages found in block: ', block.recognizedLanguages);
  });
}

const localFile = `/storage/emulated/0/DCIM/Camera/IMG_20200706_192700.jpg`;
// 184637,192311,192700
// const localFile = `${utils.FilePath.PICTURES_DIRECTORY}/IMG_20200706_184637.jpg`;


const App = () => {
  const [ loading, setLoading ] = useState(false)
  console.log(localFile);

  useEffect(() => {
    setLoading(true)
    processDocument(localFile).then(() => 
    {
      console.log('Finished processing file.')
      setLoading(false);
      return 
    }
      ).catch(console.error);
    return () => {
     console.log('Remove Event Listener')
    }
  }, [])
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          {loading && <ActivityIndicator size="large" color="black"/>}
          {/* <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View> */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
