import 'package:flutter/material.dart';

import '../models.dart';
import '../services/api_service.dart';

class CitizenFormScreen extends StatefulWidget {
  final ApiService api;
  final CitizenDetail? citizen;

  const CitizenFormScreen({super.key, required this.api, this.citizen});

  @override
  State<CitizenFormScreen> createState() => _CitizenFormScreenState();
}

class _CitizenFormScreenState extends State<CitizenFormScreen> {
  final _fullNameController = TextEditingController();
  final _phoneController = TextEditingController();
  final _emailController = TextEditingController();
  final _neighborhoodController = TextEditingController();
  final _poleController = TextEditingController();
  final _addressController = TextEditingController();
  final _referencePointController = TextEditingController();
  final _notesController = TextEditingController();
  bool _consentGiven = false;
  String _message = '';
  bool _saving = false;

  @override
  void initState() {
    super.initState();
    final citizen = widget.citizen;
    if (citizen != null) {
      _fullNameController.text = citizen.fullName;
      _phoneController.text = citizen.phone;
      _emailController.text = citizen.email;
      _neighborhoodController.text = citizen.neighborhood;
      _poleController.text = citizen.poleName;
      _addressController.text = citizen.address;
      _referencePointController.text = citizen.referencePoint;
      _notesController.text = citizen.notes;
      _consentGiven = citizen.consentGiven;
    }
  }

  Future<void> _submit() async {
    if (_fullNameController.text.trim().isEmpty) {
      setState(() => _message = 'Informe o nome completo do cidadao');
      return;
    }
    if (!_consentGiven) {
      setState(() => _message = 'Confirme o consentimento para salvar o cadastro');
      return;
    }

    setState(() {
      _saving = true;
      _message = '';
    });

    try {
      final payload = CitizenPayload(
        fullName: _fullNameController.text.trim(),
        phone: _phoneController.text.trim(),
        email: _emailController.text.trim(),
        neighborhood: _neighborhoodController.text.trim(),
        poleName: _poleController.text.trim(),
        address: _addressController.text.trim(),
        referencePoint: _referencePointController.text.trim(),
        notes: _notesController.text.trim(),
        consentGiven: _consentGiven,
      );

      if (widget.citizen == null) {
        await widget.api.createCitizen(payload);
      } else {
        await widget.api.updateCitizen(widget.citizen!.id, payload);
      }

      setState(() {
        _message = widget.citizen == null ? 'Cadastro realizado com sucesso' : 'Cadastro atualizado com sucesso';
        _saving = false;
      });

      if (widget.citizen == null) {
        _fullNameController.clear();
        _phoneController.clear();
        _emailController.clear();
        _neighborhoodController.clear();
        _poleController.clear();
        _addressController.clear();
        _referencePointController.clear();
        _notesController.clear();
        _consentGiven = false;
      }
    } catch (_) {
      setState(() {
        _saving = false;
        _message = 'Falha ao salvar cadastro';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.citizen == null ? 'Novo cidadao' : 'Editar cidadao')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: ListView(
          children: [
            Text(
              widget.citizen == null ? 'Cadastro de campo' : 'Revisao de cadastro',
              style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 8),
            const Text('Preencha os dados essenciais do cidadao e confirme o consentimento.'),
            const SizedBox(height: 20),
            TextField(controller: _fullNameController, decoration: const InputDecoration(labelText: 'Nome completo')),
            const SizedBox(height: 12),
            TextField(controller: _phoneController, decoration: const InputDecoration(labelText: 'Telefone')),
            const SizedBox(height: 12),
            TextField(controller: _emailController, decoration: const InputDecoration(labelText: 'Email')),
            const SizedBox(height: 12),
            TextField(controller: _neighborhoodController, decoration: const InputDecoration(labelText: 'Bairro')),
            const SizedBox(height: 12),
            TextField(controller: _poleController, decoration: const InputDecoration(labelText: 'Polo')),
            const SizedBox(height: 12),
            TextField(controller: _addressController, decoration: const InputDecoration(labelText: 'Endereco')),
            const SizedBox(height: 12),
            TextField(
              controller: _referencePointController,
              decoration: const InputDecoration(labelText: 'Ponto de referencia'),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _notesController,
              minLines: 3,
              maxLines: 5,
              decoration: const InputDecoration(labelText: 'Observacoes'),
            ),
            const SizedBox(height: 12),
            SwitchListTile(
              contentPadding: EdgeInsets.zero,
              title: const Text('Consentimento confirmado'),
              subtitle: const Text('O colaborador confirmou a autorizacao para o cadastro.'),
              value: _consentGiven,
              onChanged: (value) => setState(() => _consentGiven = value),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: _saving ? null : _submit,
              child: Text(_saving ? 'Salvando...' : widget.citizen == null ? 'Salvar cadastro' : 'Atualizar cadastro'),
            ),
            const SizedBox(height: 12),
            if (_message.isNotEmpty) Text(_message),
          ],
        ),
      ),
    );
  }
}
