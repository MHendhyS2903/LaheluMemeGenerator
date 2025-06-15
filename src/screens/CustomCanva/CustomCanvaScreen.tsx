import React, { useState, useCallback, useMemo } from 'react';
import { View, Alert, PermissionsAndroid, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { PanResponder } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Canvas } from './components/Canvas/Canvas';
import { CanvasElement } from './components/Canvas/types';
import Toolbar from './components/Toolbar/Toolbar';
import EditModal from './components/EditModal/EditModal';
import TemplateModal from './components/TemplateModal/TemplateModal';
import ImageModal from './components/ImageModal/ImageModal';
import { TEXT_COLORS } from '../../constants/colors';
import { styles } from './styles';

let idCounter = 0;

const CustomCanvaScreen: React.FC = () => {
  // State untuk elemen canvas
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState<string>();

  // Array ukuran font yang tersedia
  const fontSizes = useMemo(() => [12, 16, 20, 24, 32, 48, 64], []);

  // Array font family yang tersedia
  const fontFamilies = useMemo(
    () => [
      { name: 'System', value: 'System' },
      { name: 'Arial', value: 'Arial' },
      { name: 'Helvetica', value: 'Helvetica' },
      { name: 'Times New Roman', value: 'Times New Roman' },
    ],
    [],
  );

  // Template meme
  const MEME_TEMPLATES = useMemo(
    () => [
      {
        id: 'drake',
        name: 'Drake Format',
        image: 'https://i.imgflip.com/30b1gx.jpg',
        textPositions: [
          {
            type: 'text' as const,
            id: 'text1',
            text: 'Tidak Setuju',
            x: 50,
            y: 50,
            color: '#FFFFFF',
            fontSize: 28,
            fontFamily: 'System',
          },
          {
            type: 'text' as const,
            id: 'text2',
            text: 'Setuju',
            x: 50,
            y: 200,
            color: '#FFFFFF',
            fontSize: 28,
            fontFamily: 'System',
          },
        ],
      },
      {
        id: 'two-buttons',
        name: 'Two Buttons',
        image: 'https://i.imgflip.com/1g8my4.jpg',
        textPositions: [
          {
            type: 'text' as const,
            id: 'text1',
            text: 'Tombol 1',
            x: 50,
            y: 50,
            color: '#FFFFFF',
            fontSize: 32,
            fontFamily: 'System',
          },
          {
            type: 'text' as const,
            id: 'text2',
            text: 'Tombol 2',
            x: 250,
            y: 50,
            color: '#FFFFFF',
            fontSize: 32,
            fontFamily: 'System',
          },
        ],
      },
      {
        id: 'distracted-boyfriend',
        name: 'Distracted Boyfriend',
        image: 'https://i.imgflip.com/1ur9b0.jpg',
        textPositions: [
          {
            type: 'text' as const,
            id: 'text1',
            text: 'Pilihan Lain',
            x: 50,
            y: 50,
            color: '#FFFFFF',
            fontSize: 30,
            fontFamily: 'System',
          },
          {
            type: 'text' as const,
            id: 'text2',
            text: 'Kamu',
            x: 200,
            y: 150,
            color: '#FFFFFF',
            fontSize: 30,
            fontFamily: 'System',
          },
          {
            type: 'text' as const,
            id: 'text3',
            text: 'Pilihan Ini',
            x: 350,
            y: 50,
            color: '#FFFFFF',
            fontSize: 30,
            fontFamily: 'System',
          },
        ],
      },
      {
        id: 'change-my-mind',
        name: 'Change My Mind',
        image: 'https://i.imgflip.com/24y43o.jpg',
        textPositions: [
          {
            type: 'text' as const,
            id: 'text1',
            text: 'Ubah Pikiran Saya',
            x: 50,
            y: 50,
            color: '#FFFFFF',
            fontSize: 32,
            fontFamily: 'System',
          },
        ],
      },
    ],
    [],
  );

  // Handler untuk menambah teks
  const handleAddText = useCallback(() => {
    const newElement: CanvasElement = {
      type: 'text',
      id: `text-${idCounter++}`,
      text: 'Teks Baru',
      x: 50,
      y: 50,
      color: '#000000',
      fontSize: 24,
      fontFamily: 'System',
    };
    setElements(prev => [...prev, newElement]);
    setSelectedId(newElement.id);
    if (newElement.text) {
      setInputText(newElement.text);
    }
    setShowEditModal(true);
  }, []);

  // Handler untuk menambah gambar
  const handleAddImage = useCallback(async () => {
    try {
      // Cek dan minta izin untuk Android
      if (Platform.OS === 'android') {
        const permission =
          Platform.Version >= 33
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        const granted = await PermissionsAndroid.request(permission);
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Izin Diperlukan',
            'Aplikasi membutuhkan izin untuk mengakses galeri',
          );
          return;
        }
      }

      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });

      if (result.assets && result.assets[0]?.uri) {
        const newElement: CanvasElement = {
          type: 'image',
          id: `image-${idCounter++}`,
          uri: result.assets[0].uri,
          x: 50,
          y: 50,
          width: 200,
          height: 200,
          scale: 1,
        };
        setElements(prev => [...prev, newElement]);
        setSelectedId(newElement.id);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Gagal memilih gambar');
    }
  }, []);

  // Handler untuk menghapus elemen
  const handleDelete = useCallback(() => {
    if (selectedId) {
      setElements(prev => prev.filter(el => el.id !== selectedId));
      setSelectedId(null);
      setShowEditModal(false);
    }
  }, [selectedId]);

  // Handler untuk menampilkan template
  const handleShowTemplate = useCallback(() => {
    setShowTemplateModal(true);
  }, []);

  // Handler untuk memilih template
  const handleSelectTemplate = useCallback(
    (template: (typeof MEME_TEMPLATES)[0]) => {
      const imageElement: CanvasElement = {
        type: 'image',
        id: `image-${idCounter++}`,
        uri: template.image,
        x: 0,
        y: 0,
        width: 400,
        height: 400,
        scale: 1,
      };

      setElements([imageElement]);
      setShowTemplateModal(false);
    },
    [],
  );

  // Handler untuk mengubah teks
  const handleTextChange = useCallback(
    (text: string) => {
      setInputText(text);
      if (selectedId) {
        setElements(prev =>
          prev.map(el =>
            el.id === selectedId && el.type === 'text' ? { ...el, text } : el,
          ),
        );
      }
    },
    [selectedId],
  );

  // Handler untuk mengubah warna
  const handleColorChange = useCallback(
    (color: string) => {
      if (selectedId) {
        setElements(prev =>
          prev.map(el =>
            el.id === selectedId && el.type === 'text' ? { ...el, color } : el,
          ),
        );
      }
    },
    [selectedId],
  );

  // Handler untuk mengubah ukuran font
  const handleFontSizeChange = useCallback(
    (fontSize: number) => {
      if (selectedId) {
        setElements(prev =>
          prev.map(el =>
            el.id === selectedId && el.type === 'text'
              ? { ...el, fontSize }
              : el,
          ),
        );
      }
    },
    [selectedId],
  );

  // Handler untuk mengubah font family
  const handleFontFamilyChange = useCallback(
    (fontFamily: string) => {
      if (selectedId) {
        setElements(prev =>
          prev.map(el =>
            el.id === selectedId && el.type === 'text'
              ? { ...el, fontFamily }
              : el,
          ),
        );
      }
    },
    [selectedId],
  );

  // Handler untuk gesture pinch
  const handlePinchGesture = useCallback((id: string, scale: number) => {
    setElements(prev =>
      prev.map(el =>
        el.id === id && el.type === 'image'
          ? { ...el, scale: Math.min(Math.max(scale, 0.5), 3) }
          : el,
      ),
    );
  }, []);

  // Membuat pan responder untuk setiap elemen
  const createPanResponder = useCallback(
    (el: CanvasElement) =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          setSelectedId(el.id);
          if (el.type === 'text' && el.text) {
            setInputText(el.text);
            setShowEditModal(true);
          }
        },
        onPanResponderMove: (_, gestureState) => {
          setElements(prev =>
            prev.map(element =>
              element.id === el.id
                ? {
                    ...element,
                    x: element.x + gestureState.dx,
                    y: element.y + gestureState.dy,
                  }
                : element,
            ),
          );
        },
      }),
    [],
  );

  // Handler untuk duplikasi elemen
  const handleDuplicate = useCallback(() => {
    if (selectedId) {
      const elementToDuplicate = elements.find(el => el.id === selectedId);
      if (elementToDuplicate) {
        const newElement = {
          ...elementToDuplicate,
          id: `${elementToDuplicate.type}-${idCounter++}`,
          x: elementToDuplicate.x + 20,
          y: elementToDuplicate.y + 20,
        };
        setElements(prev => [...prev, newElement]);
        setSelectedId(newElement.id);
      }
    }
    setShowImageModal(false);
  }, [selectedId, elements]);

  // Handler untuk double tap pada elemen
  const handleElementDoubleTap = useCallback((element: CanvasElement) => {
    if (element.type === 'image') {
      setSelectedImageUri(element.uri);
      setShowImageModal(true);
    }
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Canvas
          elements={elements}
          selectedId={selectedId}
          onElementSelect={setSelectedId}
          onElementDoubleTap={id => {
            const element = elements.find(el => el.id === id);
            if (element) handleElementDoubleTap(element);
          }}
          createPanResponder={createPanResponder}
          onPinchGesture={handlePinchGesture}
        />

        <Toolbar
          onAddText={handleAddText}
          onAddImage={handleAddImage}
          onTemplate={handleShowTemplate}
        />

        <EditModal
          visible={showEditModal}
          onClose={() => setShowEditModal(false)}
          onDelete={handleDelete}
          onDuplicate={() => {
            handleDuplicate();
            setShowEditModal(false);
          }}
          inputText={inputText}
          onTextChange={handleTextChange}
          onColorChange={handleColorChange}
          onFontSizeChange={handleFontSizeChange}
          onFontFamilyChange={handleFontFamilyChange}
          colors={TEXT_COLORS}
          fontSizes={fontSizes}
          fontFamilies={fontFamilies}
        />

        <TemplateModal
          visible={showTemplateModal}
          onClose={() => setShowTemplateModal(false)}
          templates={MEME_TEMPLATES}
          onSelectTemplate={handleSelectTemplate}
        />

        <ImageModal
          visible={showImageModal}
          onClose={() => setShowImageModal(false)}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          imageUri={selectedImageUri}
        />
      </View>
    </SafeAreaView>
  );
};

export default CustomCanvaScreen;
