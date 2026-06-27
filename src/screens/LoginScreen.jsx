import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StatusBar,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { loginStyles as styles } from '../theme/styles';
import { useAuth } from '../context/AuthContext';

const ADMIN_CODE = 'WILD2024';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [tab, setTab] = useState('volunteer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  function handleVolunteerLogin() {
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    login('volunteer', { name, email: email.trim() });
  }

  function handleAdminLogin() {
    if (code.trim() !== ADMIN_CODE) {
      setError('Invalid admin code. Please try again.');
      return;
    }
    login('admin', { name: 'Admin' });
  }

  function switchTab(t) {
    setTab(t);
    setError('');
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          {/* Logo */}
          <View style={styles.logoSection}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>🐾</Text>
            </View>
            <Text style={styles.appName}>Wildlife Rescue</Text>
            <Text style={styles.appSub}>Lebanon</Text>
          </View>

          {/* Role toggle */}
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[styles.toggleBtn, tab === 'volunteer' && styles.toggleBtnActive]}
              onPress={() => switchTab('volunteer')}
            >
              <Ionicons name="person-outline" size={14} color={tab === 'volunteer' ? colors.textPrimary : colors.textMuted} />
              <Text style={[styles.toggleText, tab === 'volunteer' && styles.toggleTextActive]}>Volunteer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleBtn, tab === 'admin' && styles.toggleBtnActive]}
              onPress={() => switchTab('admin')}
            >
              <Ionicons name="shield-outline" size={14} color={tab === 'admin' ? colors.textPrimary : colors.textMuted} />
              <Text style={[styles.toggleText, tab === 'admin' && styles.toggleTextActive]}>Admin</Text>
            </TouchableOpacity>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Volunteer form */}
          {tab === 'volunteer' && (
            <View>
              <Text style={styles.formTitle}>Welcome back</Text>
              <Text style={styles.formSub}>Sign in to your volunteer account</Text>

              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Email</Text>
                <View style={styles.inputRow}>
                  <Ionicons name="mail-outline" size={18} color={colors.textMuted} style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="your@email.com"
                    placeholderTextColor={colors.textMuted}
                    value={email}
                    onChangeText={t => { setEmail(t); setError(''); }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Password</Text>
                <View style={styles.inputRow}>
                  <Ionicons name="lock-closed-outline" size={18} color={colors.textMuted} style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="••••••••"
                    placeholderTextColor={colors.textMuted}
                    value={password}
                    onChangeText={t => { setPassword(t); setError(''); }}
                    secureTextEntry={!showPass}
                  />
                  <TouchableOpacity onPress={() => setShowPass(v => !v)} style={styles.eyeBtn}>
                    <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={18} color={colors.textMuted} />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.primaryBtn} onPress={handleVolunteerLogin} activeOpacity={0.85}>
                <Text style={styles.primaryBtnText}>Login</Text>
              </TouchableOpacity>

              <View style={styles.registerRow}>
                <Text style={styles.registerHint}>New volunteer? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.registerLink}>Create an account →</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Admin form */}
          {tab === 'admin' && (
            <View>
              <Text style={styles.formTitle}>Admin Access</Text>
              <Text style={styles.formSub}>Enter your secure admin code to continue</Text>

              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Admin Code</Text>
                <View style={styles.inputRow}>
                  <Ionicons name="key-outline" size={18} color={colors.textMuted} style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter admin code"
                    placeholderTextColor={colors.textMuted}
                    value={code}
                    onChangeText={t => { setCode(t); setError(''); }}
                    secureTextEntry
                    autoCapitalize="characters"
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.primaryBtn} onPress={handleAdminLogin} activeOpacity={0.85}>
                <Text style={styles.primaryBtnText}>Login as Admin</Text>
              </TouchableOpacity>

              <Text style={styles.codeHint}>Demo code: WILD2024</Text>
            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
