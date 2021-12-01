import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  FlatList,
  Alert,
} from 'react-native';

import {Button} from '../components/Button';
import {SkillCard} from '../components/SkillCard';

type SkillData = {
  id: string;
  name: string;
};

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [skills, setSkills] = useState<SkillData[]>([]);

  function handleAddNewSkill() {
    if (!newSkill) return;

    const skillAlreadyExists = skills?.find(skill => {
      return skill.name === newSkill;
    });

    if (skillAlreadyExists) {
      Alert.alert(`${newSkill} já existe`);
      setNewSkill('');
      return;
    }

    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
    };

    const newSkillsSet = [...skills, data];
    setSkills([...newSkillsSet]);
    setNewSkill('');
  }

  function handleRemoveSkill(skillId: string) {
    const updatedSkills = skills.filter(skill => {
      return skill.id !== skillId;
    });

    setSkills([...updatedSkills]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vindo, Jean!</Text>

      <TextInput
        style={styles.input}
        placeholder="Nova habilidade"
        placeholderTextColor="#777"
        value={newSkill}
        onChangeText={setNewSkill}
      />

      <Button text="Inserir" onPress={handleAddNewSkill} />

      <Text style={[styles.title, styles.skillsTitle]}>Minhas habilidades</Text>
      {skills.length === 0 ? (
        <Text style={styles.nothingHere}>Ooops! Nada aqui ainda 🙁</Text>
      ) : null}
      {
        <FlatList
          data={skills}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <SkillCard
              skill={item.name}
              onPress={() => handleRemoveSkill(item.id)}
            />
          )}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    backgroundColor: '#1F1E25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    borderRadius: 7,
    marginTop: 30,
  },

  skillsTitle: {
    marginTop: 50,
    textAlign: 'center',
  },
  skillButton: {
    backgroundColor: '#1F1E25',
    padding: 10,
    borderRadius: 7,
    marginTop: 10,
  },
  skillText: {
    color: '#fff',
    fontSize: 16,
  },
  nothingHere: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 40,
  },
});
