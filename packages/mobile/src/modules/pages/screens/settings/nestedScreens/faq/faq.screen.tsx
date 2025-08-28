import { FlatList, Text } from 'react-native';
import { Layout } from 'src/shared/components/layout/Layout';
import { FAQ_DATA } from 'src/shared/components/question-data/question-data';
import { styles } from './faq-screen.styles';
import { AccordionItem } from 'src/shared/accordion-item/accordion-item';

export const Faq = () => {
	return (
		<Layout>
			<FlatList
				data={FAQ_DATA}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.list}
				renderItem={({ item }) => (
					<AccordionItem title={item.question}>
						<Text style={styles.answerText}>{item.answer}</Text>
					</AccordionItem>
				)}
				showsVerticalScrollIndicator={false}
			/>
		</Layout>
	);
};
