import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput,
  StatusBar, Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { newMissionStyles as styles } from '../theme/styles';
import BottomTabBar from '../components/BottomTabBar';

const SPECIES  = ['Injured Owl', 'Injured Fox', 'Sea Turtle', 'Injured Hawk', 'Wild Boar', 'Deer'];
const URGENCY  = ['Urgent', 'High', 'Medium', 'Low'];

const URGENCY_COLOR = { Urgent: colors.urgent, High: colors.high, Medium: colors.medium, Low: colors.tabActive };

function SelectModal({ visible, options, onSelect, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1}>
        <View style={styles.dropdownBox}>
          {options.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={styles.dropdownItem}
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

function SelectField({ label, value, options, onSelect, valueColor }) {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TouchableOpacity style={styles.selectRow} onPress={() => setOpen(true)} activeOpacity={0.8}>
        <Text style={[styles.selectText, valueColor && { color: valueColor }]}>{value}</Text>
        <Ionicons name="chevron-down" size={18} color="#888" />
      </TouchableOpacity>
      <SelectModal visible={open} options={options} onSelect={onSelect} onClose={() => setOpen(false)} />
    </View>
  );
}

function InputField({ label, value, onChangeText, icon }) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#999"
        />
        {icon && <Ionicons name={icon} size={18} color="#888" style={styles.inputIcon} />}
      </View>
    </View>
  );
}

export default function NewMissionScreen({ navigation }) {
  const [species,  setSpecies]  = useState('Injured Owl');
  const [urgency,  setUrgency]  = useState('Urgent');
  const [pickup,   setPickup]   = useState('Batroun, North Lebanon');
  const [dropoff,  setDropoff]  = useState('LWRC Center');
  const [notes,    setNotes]    = useState('Handle with care. Keep in dark\nbox. No food or water.');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Create New Mission</Text>
        <TouchableOpacity>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        <SelectField
          label="Animal Species"
          value={species}
          options={SPECIES}
          onSelect={setSpecies}
        />

        <SelectField
          label="Urgency Level"
          value={urgency}
          options={URGENCY}
          onSelect={setUrgency}
          valueColor={URGENCY_COLOR[urgency]}
        />

        <InputField
          label="Pickup Location"
          value={pickup}
          onChangeText={setPickup}
          icon="location-outline"
        />

        <InputField
          label="Drop-off Location"
          value={dropoff}
          onChangeText={setDropoff}
          icon="location-outline"
        />

        {/* Special Requirements */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Special Requirements</Text>
          <TextInput
            style={styles.textArea}
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
            placeholderTextColor="#999"
            textAlignVertical="top"
          />
        </View>

        {/* Photos */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Photos</Text>
          <View style={styles.photosRow}>
            <View style={[styles.photoThumb, { backgroundColor: '#d4e8c8' }]}>
              <Text style={styles.photoEmoji}>🦉</Text>
            </View>
            <View style={[styles.photoThumb, { backgroundColor: '#c8e0d8' }]}>
              <Text style={styles.photoEmoji}>🦉</Text>
            </View>
            <TouchableOpacity style={styles.addPhotoBtn}>
              <Ionicons name="camera-outline" size={28} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.publishBtn}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.85}
        >
          <Text style={styles.publishText}>Publish Mission</Text>
        </TouchableOpacity>

        <View style={{ height: 16 }} />
      </ScrollView>

      <BottomTabBar navigation={navigation} activeTab="Missions" />
    </SafeAreaView>
  );
}

