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

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [tab, setTab] = useState('volunteer');

  const [volEmail, setVolEmail]       = useState('');
  const [volPassword, setVolPassword] = useState('');
  const [showVolPass, setShowVolPass] = useState(false);

  const [adminEmail, setAdminEmail]       = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPass, setShowAdminPass] = useState(false);

  const [error, setError] = useState('');

  function handleVolunteerLogin() {
    if (!volEmail.trim() || !volPassword.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    const name = volEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    login('volunteer', { name, email: volEmail.trim() });
  }

  function handleAdminLogin() {
    if (!adminEmail.trim() || !adminPassword.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    login('admin', { name: 'Admin', email: adminEmail.trim() });
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
            <Text style={styles.appName}>Lebanese WildLife</Text>
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
                    value={volEmail}
                    onChangeText={t => { setVolEmail(t); setError(''); }}
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
                    value={volPassword}
                    onChangeText={t => { setVolPassword(t); setError(''); }}
                    secureTextEntry={!showVolPass}
                  />
                  <TouchableOpacity onPress={() => setShowVolPass(v => !v)} style={styles.eyeBtn}>
                    <Ionicons name={showVolPass ? 'eye-off-outline' : 'eye-outline'} size={18} color={colors.textMuted} />
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
              <Text style={styles.formSub}>Sign in with your admin credentials</Text>

              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Email</Text>
                <View style={styles.inputRow}>
                  <Ionicons name="mail-outline" size={18} color={colors.textMuted} style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="admin@wildlife.lb"
                    placeholderTextColor={colors.textMuted}
                    value={adminEmail}
                    onChangeText={t => { setAdminEmail(t); setError(''); }}
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
                    value={adminPassword}
                    onChangeText={t => { setAdminPassword(t); setError(''); }}
                    secureTextEntry={!showAdminPass}
                  />
                  <TouchableOpacity onPress={() => setShowAdminPass(v => !v)} style={styles.eyeBtn}>
                    <Ionicons name={showAdminPass ? 'eye-off-outline' : 'eye-outline'} size={18} color={colors.textMuted} />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.primaryBtn} onPress={handleAdminLogin} activeOpacity={0.85}>
                <Text style={styles.primaryBtnText}>Login as Admin</Text>
              </TouchableOpacity>
            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
