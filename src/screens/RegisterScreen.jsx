import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StatusBar,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { registerStyles as styles } from '../theme/styles';

const SPECIALTIES = ['Birds', 'Mammals', 'Reptiles', 'Marine', 'Amphibians'];

const FIELDS = [
  { key: 'name',    label: 'Full Name *',        icon: 'person-outline',     placeholder: 'Your full name',   kbType: 'default',      secure: false },
  { key: 'email',   label: 'Email *',            icon: 'mail-outline',       placeholder: 'your@email.com',   kbType: 'email-address',secure: false },
  { key: 'phone',   label: 'Phone Number',       icon: 'call-outline',       placeholder: '+961 70 000 000',  kbType: 'phone-pad',    secure: false },
  { key: 'password',label: 'Password *',         icon: 'lock-closed-outline',placeholder: '••••••••',         kbType: 'default',      secure: true  },
  { key: 'confirm', label: 'Confirm Password *', icon: 'lock-closed-outline',placeholder: '••••••••',         kbType: 'default',      secure: true  },
];

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [specialties, setSpecialties] = useState([]);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function toggleSpecialty(s) {
    setSpecialties(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  function handleSubmit() {
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <View style={styles.successContainer}>
          <View style={styles.successCircle}>
            <Ionicons name="checkmark" size={42} color="#fff" />
          </View>
          <Text style={styles.successTitle}>Account Submitted!</Text>
          <Text style={styles.successSub}>
            Your account is under review. An admin will approve it before you can start accepting missions.
          </Text>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.backBtnText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconBtn}>
              <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.sub}>Join Wildlife Rescue Lebanon as a volunteer</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {FIELDS.map(f => (
            <View key={f.key} style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{f.label}</Text>
              <View style={styles.inputRow}>
                <Ionicons name={f.icon} size={18} color={colors.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder={f.placeholder}
                  placeholderTextColor={colors.textMuted}
                  value={form[f.key]}
                  onChangeText={v => { setForm(p => ({ ...p, [f.key]: v })); setError(''); }}
                  keyboardType={f.kbType}
                  secureTextEntry={f.secure}
                  autoCapitalize={f.key === 'email' || f.secure ? 'none' : 'words'}
                />
              </View>
            </View>
          ))}

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Animal Specialties</Text>
            <View style={styles.chipsRow}>
              {SPECIALTIES.map(s => (
                <TouchableOpacity
                  key={s}
                  style={[styles.chip, specialties.includes(s) && styles.chipActive]}
                  onPress={() => toggleSpecialty(s)}
                >
                  <Text style={[styles.chipText, specialties.includes(s) && styles.chipTextActive]}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
            <Text style={styles.submitText}>Create Account</Text>
          </TouchableOpacity>

          <Text style={styles.approvalNote}>
            Your account will be reviewed by an admin before you can start accepting missions.
          </Text>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
