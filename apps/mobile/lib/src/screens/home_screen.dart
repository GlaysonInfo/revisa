import 'package:flutter/material.dart';

import '../models.dart';
import '../services/api_service.dart';
import 'citizen_form_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late final ApiService api;
  late Future<List<CitizenSummary>> _citizensFuture;
  final _searchController = TextEditingController();
  final _neighborhoodController = TextEditingController();

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    api = ModalRoute.of(context)!.settings.arguments as ApiService;
    _citizensFuture = api.searchCitizens();
  }

  Future<void> _openCitizenForm() async {
    await Navigator.push(
      context,
      MaterialPageRoute(builder: (_) => CitizenFormScreen(api: api)),
    );
    _refreshList();
  }

  void _refreshList() {
    setState(() {
      _citizensFuture = api.searchCitizens(
        query: _searchController.text,
        neighborhood: _neighborhoodController.text,
      );
    });
  }

  Future<void> _editCitizen(CitizenSummary summary) async {
    final detail = await api.getCitizen(summary.id);
    if (!mounted) return;

    await Navigator.push(
      context,
      MaterialPageRoute(builder: (_) => CitizenFormScreen(api: api, citizen: detail)),
    );
    _refreshList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('REVISA Campo')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text('Operacao territorial', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 6),
            const Text('Ponto de partida do colaborador: cadastrar, revisar e acompanhar a base local.'),
            const SizedBox(height: 12),
            ElevatedButton(
              onPressed: _openCitizenForm,
              child: const Text('Novo cadastro de cidadao'),
            ),
            const SizedBox(height: 14),
            TextField(
              controller: _searchController,
              decoration: const InputDecoration(labelText: 'Buscar por nome'),
              onSubmitted: (_) => _refreshList(),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: _neighborhoodController,
              decoration: const InputDecoration(labelText: 'Filtrar por bairro'),
              onSubmitted: (_) => _refreshList(),
            ),
            const SizedBox(height: 10),
            OutlinedButton(
              onPressed: _refreshList,
              child: const Text('Aplicar filtros'),
            ),
            const SizedBox(height: 20),
            const Text('Cadastros recentes', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
            const SizedBox(height: 10),
            Expanded(
              child: FutureBuilder<List<CitizenSummary>>(
                future: _citizensFuture,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(child: CircularProgressIndicator());
                  }
                  if (snapshot.hasError) {
                    return const Center(child: Text('Nao foi possivel carregar os cadastros.'));
                  }

                  final items = snapshot.data ?? [];
                  if (items.isEmpty) {
                    return const Center(child: Text('Nenhum cadastro realizado ainda.'));
                  }

                  return ListView.separated(
                    itemCount: items.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 8),
                    itemBuilder: (context, index) {
                      final item = items[index];
                      return ListTile(
                        tileColor: Colors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                        title: Text(item.fullName),
                        subtitle: Text(
                          [
                            if (item.neighborhood.isNotEmpty) item.neighborhood,
                            if (item.poleName.isNotEmpty) item.poleName,
                            if (item.phone.isNotEmpty) item.phone,
                          ].join(' | '),
                        ),
                        trailing: const Icon(Icons.chevron_right),
                        onTap: () => _editCitizen(item),
                      );
                    },
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
