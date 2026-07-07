import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StatusBar,
  ScrollView, KeyboardAvoidingView, Platform, Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { reportAnimalStyles as styles } from '../theme/styles';
import BottomTabBar from '../components/BottomTabBar';

const ANIMAL_TYPES = ['Bird', 'Mammal', 'Reptile', 'Marine Animal', 'Amphibian', 'Unknown'];
const CONDITIONS   = ['Critical — Needs immediate help', 'Injured — Can move slightly', 'Trapped — Not visibly hurt', 'Needs Assessment'];

function SelectModal({ visible, options, onSelect, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.dropdownBox}>
          {options.map((opt, idx) => (
            <TouchableOpacity
              key={opt}
              style={[styles.dropdownItem, idx === options.length - 1 && { borderBottomWidth: 0 }]}
              onPress={() => { onSelect(opt); onClose(); }}
            >
              <Text style={styles.dropdownText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

export default function ReportAnimalScreen({ navigation }) {
  const [animalType, setAnimalType]   = useState('');
  const [condition, setCondition]     = useState('');
  const [location, setLocation]       = useState('');
  const [description, setDescription] = useState('');
  const [showTypeModal, setShowTypeModal]   = useState(false);
  const [showCondModal, setShowCondModal]   = useState(false);
  const [submitted, setSubmitted]     = useState(false);
  const [error, setError]             = useState('');

  function handleSubmit() {
    if (!animalType || !condition || !location.trim()) {
      setError('Please fill in animal type, condition and location.');
      return;
    }
    setError('');
    setSubmitted(true);
  }

  function handleNewReport() {
    setAnimalType('');
    setCondition('');
    setLocation('');
    setDescription('');
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <View style={styles.successContainer}>
          <View style={styles.successCircle}>
            <Ionicons name="checkmark" size={42} color="#fff" />
          </View>
          <Text style={styles.successTitle}>Report Submitted!</Text>
          <Text style={styles.successSub}>
            Your report has been sent to the admin.{'\n'}
            A mission will be created and assigned shortly.
          </Text>
          <TouchableOpacity style={styles.newReportBtn} onPress={handleNewReport} activeOpacity={0.85}>
            <Text style={styles.newReportText}>Submit Another Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => navigation.navigate('VolunteerHome')}
            activeOpacity={0.85}
          >
            <Text style={styles.homeBtnText}>Back to Missions</Text>
          </TouchableOpacity>
        </View>
        <BottomTabBar navigation={navigation} activeTab="Report" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.header}>
        <Text style={styles.title}>Report Animal</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.infoCard}>
            <Ionicons name="information-circle-outline" size={18} color={colors.tabActive} />
            <Text style={styles.infoText}>
              Fill in the details below. The admin will review your report and create a rescue mission.
            </Text>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Animal Type */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Animal Type *</Text>
            <TouchableOpacity style={styles.selectRow} onPress={() => setShowTypeModal(true)}>
              <Text style={[styles.selectText, !animalType && { color: colors.textMuted }]}>
                {animalType || 'Select animal type'}
              </Text>
              <Ionicons name="chevron-down" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          {/* Condition */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Condition *</Text>
            <TouchableOpacity style={styles.selectRow} onPress={() => setShowCondModal(true)}>
              <Text style={[styles.selectText, !condition && { color: colors.textMuted }]}>
                {condition || 'Select condition'}
              </Text>
              <Ionicons name="chevron-down" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          {/* Location */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Location *</Text>
            <View style={styles.locationRow}>
              <View style={[styles.inputRow, { flex: 1 }]}>
                <Ionicons name="location-outline" size={18} color={colors.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter location or area"
                  placeholderTextColor={colors.textMuted}
                  value={location}
                  onChangeText={t => { setLocation(t); setError(''); }}
                />
              </View>
              <TouchableOpacity style={styles.gpsBtn}>
                <Ionicons name="navigate" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.gpsHint}>Tap the GPS button to use your current location</Text>
          </View>

          {/* Description */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Description</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Describe the animal's situation, any visible injuries, surroundings..."
              placeholderTextColor={colors.textMuted}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Photos */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Photos</Text>
            <View style={styles.photosRow}>
              <TouchableOpacity style={styles.addPhotoBtn}>
                <Ionicons name="camera-outline" size={28} color={colors.textMuted} />
                <Text style={styles.addPhotoText}>Add Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addPhotoBtn}>
                <Ionicons name="image-outline" size={28} color={colors.textMuted} />
                <Text style={styles.addPhotoText}>Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
            <Ionicons name="send-outline" size={18} color="#fff" />
            <Text style={styles.submitText}>Submit Report</Text>
          </TouchableOpacity>

          <View style={{ height: 16 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomTabBar navigation={navigation} activeTab="Report" />

      <SelectModal
        visible={showTypeModal}
        options={ANIMAL_TYPES}
        onSelect={setAnimalType}
        onClose={() => setShowTypeModal(false)}
      />
      <SelectModal
        visible={showCondModal}
        options={CONDITIONS}
        onSelect={setCondition}
        onClose={() => setShowCondModal(false)}
      />
    </SafeAreaView>
  );
}
