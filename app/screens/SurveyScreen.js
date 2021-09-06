import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';
import { SimpleSurvey } from "react-native-simple-survey";

import ActivityIndicator from '../components/ActivityIndicator';
import AppButton from '../components/Button';
import colors from '../config/colors';
import Screen from '../components/Screen';
import interestsApi from '../api/interests';
import surveyApi from "../api/survey";
import Text from '../components/Text';
import UploadScreen from "../components/UploadScreen";
import useApi from '../hooks/useApi';
import routes from '../navigation/routes';

function SurveyScreen({ navigation }) {
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    
    const {
        request: loadSurvey,
        data: webSurvey,
        loading,
        error,
    } = useApi(surveyApi.getSurvey);

    useEffect(() => {
        loadSurvey();
    }, []);

    const renderButton = (data, index, isSelected, onPress) => (
        <View
            key={`selection_button_view_${index}`}
            style={{ marginTop: 5, marginBottom: 5, justifyContent: 'flex-start' }}
        >
            <Button
                title={data.optionText}
                onPress={onPress}
                color={isSelected ? colors.primary : colors.secondary}
                style={isSelected ? { fontWeight: 'bold' } : {}} 
                key={`button_${index}`}
            />
        </View>
    );

    const renderPreviousButton = (onPress, enabled) => (
        <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
            <Button
                color={colors.primary}
                onPress={onPress}
                disabled={!enabled}
                backgroundColor={colors.primary}
                title={'Previous'}
            />
        </View>
    );

    const renderNextButton = (onPress, enabled) => (
        <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
            <Button
                color={colors.primary}
                onPress={onPress}
                disabled={!enabled}
                backgroundColor={colors.primary}
                title={'Next'}
            />
        </View>
    );
    const renderFinishedButton = (onPress, enabled) => (
        <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
            <Button
                color={colors.primary}
                onPress={onPress}
                disabled={!enabled}
                title={'Finished'}
            />
        </View>
    );

    const renderQuestionText = (questionText) => (
        <View style={{ marginLeft: 10, marginRight: 10 }}>
            <Text numLines={1} style={styles.questionText}>{questionText}</Text>
        </View>
    );

    const onSurveyFinished = async (ans) => {
        setProgress(0);
        setUploadVisible(true);
        const result = await interestsApi.postUserInterests(
            { preferences: ans },
            (progress) => setProgress(progress)
        );

        if (!result.ok) {
            setUploadVisible(false);
            return alert("Could not submit the survey");
        }
    }

    // const onAnswerSubmitted = (ans) => {
    //     console.log(ans);
    // }

    const renderTextBox = (onChange, value, placeholder, onBlur) => (
        <View>
            <TextInput
                style={styles.textBox}
                onChangeText={text => onChange(text)}
                numberOfLines={1}
                underlineColorAndroid={'white'}
                placeholder={placeholder}
                placeholderTextColor={'rgba(184,184,184,1)'}
                value={value}
                multiline
                onBlur={onBlur}
                blurOnSubmit
                returnKeyType='done'
            />
        </View>
    );

    const renderNumericInput = (onChange, value, placeholder, onBlur) => (
        <TextInput 
            style={styles.numericInput}
            onChangeText={text => { onChange(text); }}
            underlineColorAndroid={'white'}
            placeholderTextColor={'rgba(184,184,184,1)'}
            value={String(value)}
            placeholder={placeholder}
            keyboardType={'numeric'}
            onBlur={onBlur}
            maxLength={3}
        />
    );

    const renderInfoText = (infoText) => (
        <View style={{ marginLeft: 10, marginRight: 10 }}>
            <Text style={styles.infoText}>{infoText}</Text>
        </View>
    );

    const renderSurvey = () => {
        if (webSurvey.length) return (
        <SimpleSurvey
            // ref={(s) => { surveyRef = s; }}
            survey={webSurvey}
            renderSelector={renderButton}
            containerStyle={styles.surveyContainer}
            selectionGroupContainerStyle={styles.selectionGroupContainer}
            navButtonContainerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
            renderPrevious={renderPreviousButton}
            renderNext={renderNextButton}
            renderFinished={renderFinishedButton}
            renderQuestionText={renderQuestionText}
            onSurveyFinished={(answers) => onSurveyFinished(answers)}
            // onAnswerSubmitted={(answer) => onAnswerSubmitted(answer)}
            renderTextInput={renderTextBox}
            renderNumericInput={renderNumericInput}
            renderInfo={renderInfoText}
        />);
    }

    const onUploadComplete = () => {
        setUploadVisible(false); 
        navigation.navigate(routes.FEED);
    }

    return (
        <>
            <ActivityIndicator visible={loading} />
            <Screen>
                <UploadScreen
                    onDone={onUploadComplete}
                    progress={progress}
                    visible={uploadVisible}
                />
                {error && (
                    <>
                        <Text>Couldn't retrieve the survey.</Text>
                        <AppButton title="Retry" onPress={loadSurvey} />
                    </>
                )}
                {renderSurvey()}
            </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    surveyContainer: {
        width: 'auto',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        alignContent: 'center',
        padding: 5,
        flexGrow: 0,
        elevation: 20,
    },
    selectionGroupContainer: {
        flexDirection: 'column',
        backgroundColor: 'white',
        alignContent: 'flex-end',
    },
    questionText: {
        fontSize: 35,
        marginBottom: 30,
    },
    infoText: {
        fontSize: 30,
        marginBottom: 50,
        textAlign: 'center',
    }
});

export default SurveyScreen;